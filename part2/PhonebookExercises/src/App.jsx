import { useState, useEffect } from 'react'
import AddNewEntryForm from './Components/AddNewEntryForm'
import Notification from './Components/Notification'
import ErrorNotif from './Components/ErrorNotif'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import personsService from './Services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotif message={errorMessage} />
      <Notification message={notifMessage} />
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
        setNotifMessage={setNotifMessage}
        setErrorMessage={setErrorMessage}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        setPersons={setPersons}
        showAll={showAll} 
        filterBy={filterBy}
      />
    </div>
  )
}

export default App