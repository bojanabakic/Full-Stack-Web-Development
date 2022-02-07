import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorClass, setErrorClass] = useState('success')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('You have successfully logged in!')
      setErrorClass('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setErrorClass('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    blogService.removeToken()
    setUser(null)
    setUsername('')
    setPassword('')
    setErrorMessage('You have successfully logged out!')
    setErrorClass('success')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(blog)
      setBlogs(blogs.concat(response))
      setErrorMessage('A new blog ' + response.title + ' by ' + response.author + ' added')
      setErrorClass('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Error while adding new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateLikes = async (id) => {
    try {
      const blog = blogs.find(x => x.id === id)
      const changedBlog = { ...blog, likes: blog.likes += 1 }
      await blogService.update(id, changedBlog)
      setBlogs(blogs.map(x => x.id !== id ? x : changedBlog))
      setErrorMessage('Successfully updated')
      setErrorClass('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Error while updating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    try {
      const blog = blogs.find(x => x.id === id)
      const popup = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (popup) {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setErrorMessage('Successfully deleted!')
        setErrorClass('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Error while deleting blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <ErrorMessage message={errorMessage} className={errorClass} />
        <h2>Log in to application</h2>
        <form data-testid='loginForm' onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button data-testid="loginButton" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorMessage message={errorMessage} className={errorClass} />
      <h3> {user.username} is logged in. <form onSubmit={handleLogout}> <button type="submit">logout</button> </form></h3>

      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs.sort((a, b) => a.likes < b.likes ? -1 : 1) && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={() => updateLikes(blog.id)} removeBlog={() => removeBlog(blog.id)} />
      )}
    </div>
  )
}

export default App