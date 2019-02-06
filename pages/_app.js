
import App, { Container } from 'next/app'
import withApolloClient from '../lib/apollo'
import { ApolloProvider } from 'react-apollo'
import Layout from '../components/app/layout.js'
import Secured from '../components/app/secured/container'
import MaterialUI from '../lib/material'

class MyApp extends App {

  render() {
    const { Component, pageProps, apolloClient, router } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <MaterialUI {...this.props}>
            <Secured token={router.query.token}>
              <Layout {...pageProps}>
                <Component key={this.props.router.route} {...pageProps} />
              </Layout>
            </Secured>
          </MaterialUI>
        </ApolloProvider>
        <style jsx global>
          {`body {
              margin: 0;
            }`}
        </style>
      </Container >
    )
  }
}

export default withApolloClient(MyApp)
