import React from 'react'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'

const Logo = ({ size, classes }) => (
  <div style={{ display: 'flex', width: size, height: size }}>
    <Avatar className={classes.logo} style={{ width: '100%', height: '100%' }} ></Avatar>
    <Typography className={classes.text} style={{ fontSize: size/2}} variant="h3"  >Brand</Typography>
  </div>
)

Logo.propTypes = {
  size: PropTypes.number
}

Logo.defaultProps = {
  size: 45
}

export default withStyles(theme => ({
  logo: {
    background: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    color: theme.palette.primary.main
  },
  text: {
    margin:'auto',
    color: 'white'
  },
  black: {
    color: 'white',
    background: theme.palette.primary.main
  },
  textBlack: {
    color: theme.palette.primary.main,
  }
}))(Logo)