import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core'

const Loading = ({ classes }) => <CircularProgress className={classes.loading} variant="indeterminate" />

export default withStyles({
  loading: {
    position: 'fixed',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)'
  }
})(Loading)
