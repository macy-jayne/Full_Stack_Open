const Blog = require('../Models/blog')

const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Fake Author',
    url: 'www.justatest.com',
    likes: 11
  },
  {
    title: 'Test Blog 2',
    author: 'Fake Author 2',
    url: 'www.justatest2.com',
    likes: 12
  },
  {
    title: 'Test Blog 3',
    author: 'Fake Author 3',
    url: 'www.justatest3.com',
    likes: 13
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}