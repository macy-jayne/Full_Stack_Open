const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstack:${password}@ac-srblrz9-shard-00-00.rc83rjz.mongodb.net:27017,ac-srblrz9-shard-00-01.rc83rjz.mongodb.net:27017,ac-srblrz9-shard-00-02.rc83rjz.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-djm9lh-shard-0&authSource=admin&appName=for-Phonebook-fullstackopen`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
