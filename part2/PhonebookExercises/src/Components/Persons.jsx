import personsService from '../Services/persons'

const Persons = ({persons, setPersons, showAll, filterBy}) => {

  const entriesToShow = showAll ? persons :
    persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()) 
    || person.number.includes(filterBy)
  )

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id).then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    } else {
      console.log('delete action averted')
    }
  }

  return (
    <div>
      {entriesToShow.map(person => 
          <div key={person.name}>
            {person.name}: {person.number} 
            <button 
              onClick={() => handleDelete(person.id, person.name)}
              style={{marginLeft: '1rem'}}
            >Delete</button>
          </div>
        )}
    </div>
  )
}

export default Persons