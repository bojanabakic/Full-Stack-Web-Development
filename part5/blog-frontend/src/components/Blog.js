import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div data-testid='blogs' className='info'>
        Title: {blog.title} Author: {blog.author} <br />
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility} data-testid='viewButton'>view</button> <br />
        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>hide</button> <br/>
          <div data-testid='url'>URL: {blog.url}</div> <br />
          <div data-testid='likes'>Likes: {blog.likes}</div> <button onClick={updateLikes} data-testid='likeButton'>like</button><br />
          <button onClick={removeBlog} data-testid='removeButton'>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog