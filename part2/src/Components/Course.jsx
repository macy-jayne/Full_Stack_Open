const Course = ({course}) => {
  const headerText = course.name
  const parts = course.parts
  const totalExercises = parts.reduce((total, part) => {
    return total + part.exercises
  }, 0)

  return (
    <div>
        <h2>{headerText}</h2>
        {parts.map(part => {
            return (
            <div key={part.id}>
                <p>{part.name}</p>
                <p>Exercises: {part.exercises}</p>
                <br/>
            </div>
            )
        })}
        <p style={{fontWeight:'bold'}}>Total of {totalExercises} exercises</p>
        <br/>
    </div>
  )
}

export default Course