const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../Models/blog')
const assert = require('node:assert')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

describe('GET requests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('all blogs have an id property', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      assert(blog.id)
    })
  })
})

describe('POST requests', () => {
  test('POST request adds a new blog', async () => {
    const newBlog = {
      title: 'Test Blog 4',
      author: 'Fake Author 4',
      url: 'www.justatest4.com',
      likes: 14
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(201)
    
    
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert.strictEqual(response.body[3].author, 'Fake Author 4')
    assert.strictEqual(response.body[3].title, 'Test Blog 4')
    assert.strictEqual(response.body[3].url, 'www.justatest4.com')
    assert.strictEqual(response.body[3].likes, 14)
    assert(response.body[3].id)
  })

  test('POST request with missing likes auto sets likes to 0', async () => {
    const newBlog = {
      title: 'Test Blog 4',
      author: 'Fake Author 4',
      url: 'www.justatest4.com',
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(201)
    
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[3].likes, 0)
  })

  test('POST request with missing title returns 400', async () => {
    const newBlog = {
      author: 'Fake Author 4',
      url: 'www.justatest4.com',
    }

    const response = await api.post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(400)

    assert.strictEqual(response.body.error, 'missing attributes. Make sure both a title and url are included')
  })

  test('POST request with missing url returns 400', async () => {
    const newBlog = {
      title: 'Test Blog 4',
      author: 'Fake Author 4',
      likes: 14
    }

    const response = await api.post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(400)

    assert.strictEqual(response.body.error, 'missing attributes. Make sure both a title and url are included')
  })
})

describe('DELETE requests', () => {
  test('single blog deletion', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToDelete = startingBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const endingBlogs = await helper.blogsInDb()
    assert.strictEqual(endingBlogs.length, startingBlogs.length - 1)
  })

  test('invalid id for deletion', async () => {
    const startingBlogs = await helper.blogsInDb()
    const randoId = 'abc43f94469a047213d00000'

    await api
      .delete(`/api/blogs/${randoId}`)
      .expect(404)
  })
})

describe('PUT request', () => {
  test('update blog likes', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToUpdate = startingBlogs[0]
    const updatedLikes = { likes: 1000 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)

    const endingBlogs = await helper.blogsInDb()
    assert.strictEqual(endingBlogs[0].likes, 1000)
  })

  test('update blog', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToUpdate = startingBlogs[0]
    const updatedLikes = { likes: 1000, author: "Hi", title: "Hello" }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)

    const endingBlogs = await helper.blogsInDb()
    assert.strictEqual(endingBlogs[0].likes, 1000)
    assert.strictEqual(endingBlogs[0].author, "Hi")
    assert.strictEqual(endingBlogs[0].title, "Hello")
  })

  test('returns 404 for invalid id', async () => {
    const startingBlogs = await helper.blogsInDb()
    const randoId = 'abc43f94469a047213d00000'
    const updatedLikes = { likes: 1000 }

    await api
      .put(`/api/blogs/${randoId}`)
      .send(updatedLikes)
      .expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})
