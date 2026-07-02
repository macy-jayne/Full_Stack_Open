const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const now = new Date()
  response.send(
    `<div><p>Phonebook has info for ${persons.length} people</p><p>${now}</p></div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(200).end()
})

const generateId = () => {
  return Math.random().toString(36).substring(2) 
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({error: 'missing name'})
  }

  if (!body.number) {
    return response.status(400).json({error: 'missing number'})
  }

  const name = body.name
  const p = persons.find(p => p.name === name)
  if (p) {
    return response.status(400).json({
      error: 'An entry with that name already exists'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  persons = persons.concat(person)
  response.json(person)
})

// The name or number is missing
// The name already exists in the phonebook

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})