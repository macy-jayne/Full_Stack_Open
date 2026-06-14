const StatsLine = ({ text, stat }) => {

  return (
    (text === 'Positive' ?
      <p>{text}: {stat}%</p> :
      <p>{text}: {stat}</p>
    ))
}

export default StatsLine