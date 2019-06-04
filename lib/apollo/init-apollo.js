import { ApolloClient } from 'apollo-boost'
import { HttpLink, ApolloLink } from 'apollo-boost'
import { InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch'
let apolloClient = null

let httpLink = getHttpLink(); /* new HttpLink({
  uri: 'http://localhost:9000/graphql', // Server URL (must be absolute)
  credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
}) */

let authLink = setContext((_, { headers }) => {
  let authorization = null
  if (process.browser) {
    if (_.variables.token) localStorage.token = _.variables.token
    // get the authentication token from local storage if it exists
    const token = localStorage.token
    authorization = token && `Bearer ${token}`
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization
    }
  }
})

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

function getHttpLink() {
  const config = process.env.MS
  if (typeof config === 'string') {
    const endpoints = config.split(';').map(endpoint => {
      const name = endpoint.split('|')[0]
      const uri = endpoint.split('|')[1]
      return { name, uri }
    })
    return split(endpoints, null)
  }
  else
    return null
}

function split(endpoints, lastLink) {
  if (!endpoints.length)
    return lastLink

  if (!lastLink) {
    const link = endpoints.pop()
    lastLink = new HttpLink({
      uri: link.uri, // Server URL (must be absolute)
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    })
  }

  if (!endpoints.length)
    return lastLink

  const next = endpoints.pop()

  return split(endpoints, ApolloLink.split(
    operation => operation.getContext().clientName === next.name,
    new HttpLink({
      uri: next.uri, // Server URL (must be absolute)
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }),
    lastLink
  ))

}


export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}