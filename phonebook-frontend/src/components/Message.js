import React from 'react'

const Message = (props) => {
    if (props.message === null) return null
  
    return (
      <div className={`message message_${props.message.type}`}>
        {props.message.text}
      </div>
    )
  }

  export default Message