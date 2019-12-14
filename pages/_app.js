import App, { Container } from 'next/app'
import Head from 'next/head'
import withApolloClient from '../lib/apollo'
import { ApolloProvider } from 'react-apollo'
import Layout from '../components/app/layout'
import { ThemeProvider } from '@material-ui/styles'
import Secured from '../components/app/secured/bypass' // use container for security

import theme from '../lib/material/theme'
class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, router } = this.props

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Secured token={router.query.token}>
              <Layout {...pageProps} router={router}>
                <Component key={this.props.router.route} {...pageProps} />
              </Layout>
            </Secured>
          </ThemeProvider>
        </ApolloProvider>
        <style jsx global>
          {`
            body {
              margin: 0;
              background-color: white;
            }
          `}
        </style>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
