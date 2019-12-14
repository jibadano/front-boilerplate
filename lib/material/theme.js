import { createMuiTheme } from '@material-ui/core/styles'

import secondaryColor from '@material-ui/core/colors/amber'
import error from '@material-ui/core/colors/red'

// A theme with custom primary and secondary color.
// It's optional.
export default createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#222'
    },
    secondary: {
      main: secondaryColor[600]
    },
    error
  },
  overrides: {
    MuiAvatar: {
      root: {
        WebkitClipPath:
          'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
        clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
        borderRadius: 0,
        height: 45,
        width: 45
      }
    },
    MuiButton: {
      contained: {
        boxShadow: 'none'
      }
    }
  },
  shape: {
    borderRadius: 0
  }
})
