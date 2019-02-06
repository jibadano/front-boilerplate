import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { ApolloError } from 'apollo-boost'

class Error extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open:true, error: props.error }
  }

  onClose = () => {
    const { onClose } = this.props
    this.setState({ open: false })
    onClose()
  }

  render() {
    const { title } = this.props
    const { open, error } = this.state
    return (
      <Dialog
        open={open}
        onClose={this.onClose}
        scroll="paper"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {error instanceof ApolloError ?
              (error.map ? error.map(({ message }) => message) : error.message) :
              error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

Error.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  onClose: PropTypes.func
}

Error.defaultProps = {
  title: 'Unexpected error',
  error: null,
  onClose: () => { }
}

export default Error

