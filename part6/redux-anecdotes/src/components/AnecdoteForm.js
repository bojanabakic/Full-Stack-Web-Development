import React from 'react'
import { connect } from "react-redux"
import { setNotification } from '../reducers/notificationReducer'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(content)
    props.setNotification(`You created a new anecdote '${content}'`, 5)
  }

  return (
    <div><h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form></div>
  )
}

export default connect(null, {addAnecdote, setNotification })(AnecdoteForm)