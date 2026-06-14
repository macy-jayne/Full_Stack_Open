const Total = ({parts}) => {
  
  const exercises = parts.map(part => part.exercises)
  let total = 0
  console.log(exercises)
  
  exercises.forEach(value => {
    total += value
  })

  return (
    <div>
      <p>Number of exercises: {total}</p>
    </div>
  )
}

export default Total