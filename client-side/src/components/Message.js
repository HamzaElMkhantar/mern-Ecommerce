import React from 'react'
import { Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Message({variant, children}) {
  return (
    <Alert variant={variant} >{children}</Alert>
  )
}
Message.defaultProps = {
    variant : 'info',
}

export default Message