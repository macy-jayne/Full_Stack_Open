import { useState, useEffect } from 'react'
import AddNewEntryForm from './Components/AddNewEntryForm'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        setFilterBy={setFilterBy} 
        setShowAll={setShowAll} 
        filterBy={filterBy}
      />
      <AddNewEntryForm 
        persons={persons} 
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNum={newNum}
        setNewNum={setNewNum}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        showAll={showAll} 
        filterBy={filterBy}
      />
    </div>
  )
}

export default App