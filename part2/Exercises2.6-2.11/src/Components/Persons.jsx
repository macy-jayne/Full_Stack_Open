const Persons = ({persons, showAll, filterBy}) => {

  const entriesToShow = showAll ? persons :
    persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()) 
    || person.number.includes(filterBy)
  )

  return (
    <div>
      {entriesToShow.map(person => 
          <p key={person.name}>{person.name}: {person.number}</p>
        )}
    </div>
  )
}

export default Persons