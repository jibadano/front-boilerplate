import React from 'react';
import Authenticate from '../authenticate'
import Loading from '../loading'
import Error from '../error'

export default ({ children, error, loading, success, onLogin }) => {
  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!success) return <Authenticate onSuccess={onLogin} />
  return children
}
