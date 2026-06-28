import personsService from '../Services/persons'

const AddNewEntryForm = ({
  persons, 
  setPersons, 
  newName, 
  setNewName, 
  newNum, 
  setNewNum
}) => {
  const handleAdd = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNum
    }

    const nameExists = persons.some(person =>
      person.name === newName)

    if (nameExists) {
      const thePerson = persons.find(person => person.name === newName)
      const personId = thePerson.id
      if (newNum !== '' && newNum !== thePerson.number) {
        if (window.confirm(`${newName} is already in the phonebook. Replace old number with a new one?`)) {
          const newPerson = {...thePerson, number: newNum}
          personsService
            .update(personId, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === personId ? returnedPerson : person))
              setNewName('')
              setNewNum('')
            })
            return
        }
        return
      }
    }
    if (newName === '') {
      alert(`Please enter an associated name`)
      return
    }
    if (newNum === '') {
      alert(`Please enter an associated phone number`)
      return
    }
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
      })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  return (
    <div>
      <h3>Add New</h3>
      <form onSubmit={handleAdd}>
        <div>
          Name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          Number: <input value={newNum} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddNewEntryForm