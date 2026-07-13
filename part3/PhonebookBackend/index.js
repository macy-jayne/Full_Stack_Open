require('dotenv').config()
const express = require('express')
const Person = require('./Models/person')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
))

// let persons = [
//   { 
//     "id": "1",
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": "2",
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": "3",
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": "4",
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
// ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/info', (request, response) => {
  Person.find({}).then(persons => {
    const count = persons.length
    const now = new Date()
    response.send(
      `<div><p>Phonebook has info for ${count} people</p><p>${now}</p></div>`
    )
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(200).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

// The name or number is missing
// The name already exists in the phonebook

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})