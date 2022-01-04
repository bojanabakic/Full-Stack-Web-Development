const blogRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) response.json(blog)
  else response.status(404).end()
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url)
    return response.status(400).json({ error: 'Blog title or URL are missing' })

  let blog = undefined
  if (body.likes === undefined) {
    blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
    })
  } else {
    blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })
  }

  const savedBlog = await blog.save()
  response.set(200).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedLikes = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedLikes, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter