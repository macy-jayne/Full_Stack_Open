const blogRouter = require('express').Router()
const Blog = require('../Models/blog.js')

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/', (request, response) => {
  if (request.body.title && request.body.url) {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
      response.status(201).json(result)
    })
  } else {
    response.status(400).json({ error: 'missing attributes. Make sure both a title and url are included' })
  }
})

module.exports = blogRouter
