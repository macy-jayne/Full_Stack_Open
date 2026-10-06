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

blogRouter.delete('/:id', (request, response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then((blog) => {
      if (!blog) { return response.status(404).end() }
      response.status(204).end()
    })
    .catch(error => console.log(error))
})

blogRouter.put('/:id', (request, response, next) => {
  const { likes, author, title, url } = request.body

  Blog.findById(request.params.id)
    .then(blog => {
      if (!blog) {
        return response.status(404).end()
      }

      if (author) blog.author = author
      if (title) blog.title = title
      if (url) blog.url = url
      if (likes) blog.likes = likes

      return blog.save().then((updatedBlog) => {
        response.json(updatedBlog)
      })
    })
    .catch(error => next(error))
})

module.exports = blogRouter
