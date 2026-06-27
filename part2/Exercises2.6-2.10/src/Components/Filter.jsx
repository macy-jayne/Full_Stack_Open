const Filter = ({setFilterBy, setShowAll, filterBy}) => {

  const handleFilter = (event) => {
    setFilterBy(event.target.value)
    if (event.target.value !== '') {
      setShowAll(false)
    }
    else { setShowAll(true) }
  }

  return (
    <div>
      <form onSubmit={handleFilter}>
        <div>
          Search: <input value={filterBy} onChange={handleFilter}/>
        </div>
      </form>
    </div>
  )
}

export default Filter