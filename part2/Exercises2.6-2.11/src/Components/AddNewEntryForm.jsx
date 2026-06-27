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
      alert(`${newName} is already in the Phonebook`)
      return
    }
    if (newName === '') {
      alert(`Please enter an associated name`)
      return
    }
    if (newNum === '') {
      alert(`Please enter an associated phone number`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNum('')
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