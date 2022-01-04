const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

const Blog = require('../models/blog')

beforeAll(done => {
  done()
})

describe('testing retrieval of all blog listings', () => {
  test('succeeds while returning json output', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
}, 100000)

describe('viewing a specific blog listing', () => {
  test('succeeds with a valid id', async () => {
    const responseGet = await api.get('/api/blogs')
    expect(responseGet.body[0].id).toBeDefined()
    expect(responseGet.body[0]._id).toBe(undefined)
  }, 100000)
})

describe('addition of a new blog listing', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    }

    const responseGetBefore = await api.get('/api/blogs')
    const blogsB = responseGetBefore.body

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const responseGetAfter = await api.get('/api/blogs')
    const blogsA = responseGetAfter.body
    expect(blogsA).toHaveLength(blogsB.length + 1)
  }, 100000) 
})

describe('addition of a new blog listing without specifing likes value', () => {
  test('succeeds while adding default value', async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  }, 100000)
})

describe('addition of an incomplete blog listing', () => {
  test('fails with status code 400 if data invaild', async () => {
    const newBlog = {
      author: true
    }

    const responseGetBefore = await api.get('/api/blogs')
    const blogsB = responseGetBefore.body

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const responseGetAfter = await api.get('/api/blogs')
    const blogsA = responseGetAfter.body
    expect(blogsA).toHaveLength(blogsB.length)
  }, 100000)
})

afterAll(done => {
  mongoose.connection.close()
  done()
})