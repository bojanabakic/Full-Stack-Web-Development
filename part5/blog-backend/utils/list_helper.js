const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs === undefined) return 0

  let sum = 0

  blogs.forEach(blog => {
    sum = sum + blog.likes
  })

  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  let favorite = blogs[0]
  let counter = 0

  blogs.forEach(blog => {
    if (counter < blog.likes) {
      counter = blog.likes
      favorite = blog
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  let blogsPerAuthor = lodash.countBy(blogs, "author")
  const sorted = Object.entries(blogsPerAuthor).reduce((a, b) => a[0] > b[0] ? a : b)

  const theAuthor = {
    author: sorted[0],
    blogs: sorted[1]
  }

  return theAuthor
}

const author = (blog) => blog.author

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const groupedBlogs = lodash.groupBy(blogs, author)
  const likes = lodash.mapValues(groupedBlogs, totalLikes)
  const sorted = Object.entries(likes).reduce((a, b) => a[1] > b[1] ? a : b)
  
  const theAuthor = {
    author: sorted[0],
    likes: sorted[1]
  }

  return theAuthor
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}