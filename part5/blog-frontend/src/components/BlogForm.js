import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()
    addBlog({
      title,
      author,
      url,
      likes
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <div>
      <h2> Add a new blog </h2>
      <form id="addBlogForm" onSubmit={handleAddBlog}>
        <div>
          title
          <input
            data-testid='title'
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input
            data-testid='author'
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input
            data-testid='url'
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          likes:
          <input
            data-testid="likes"
            value={likes}
            name="likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button data-testid='addBlog' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm