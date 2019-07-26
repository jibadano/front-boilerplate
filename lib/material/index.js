import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import getPageContext from './getPageContext'
import JssProvider from 'react-jss/lib/JssProvider'

class MaterialUI extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.pageContext = this.props.pageContext || getPageContext()
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  pageContext = null

  render() {
    const { children } = this.props
    // MuiThemeProvider makes the theme available down the React tree thanks to React context.
    return (
      <JssProvider
        registry={this.pageContext.sheetsRegistry}
        generateClassName={this.pageContext.generateClassName}
      >
        {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
        <ThemeProvider theme={this.pageContext.theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
          {children}
        </ThemeProvider>
      </JssProvider>
    )
  }
}

MaterialUI.propTypes = {
  pageContext: PropTypes.object
}

MaterialUI.getInitialProps = ctx => {
  if (Component.getInitialProps) {
    return Component.getInitialProps(ctx)
  }

  return {}
}

export default MaterialUI
