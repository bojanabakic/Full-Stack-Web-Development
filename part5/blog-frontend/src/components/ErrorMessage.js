import React from 'react'

const ErrorMessage = (props) => {
  const message = props.message
  const className = props.className
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default ErrorMessage