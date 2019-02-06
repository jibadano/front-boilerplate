import React from 'react'
import { withStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Logo from './logo'

const Header = ({ classes, children }) =>
  <AppBar position="fixed">
    <Toolbar >
      <Logo />
      <div className={classes.menu}>
        {children}
      </div>
    </Toolbar>
  </AppBar>

export default withStyles({
  menu: {
    position: 'absolute',
    right: 0
  }
})(Header)