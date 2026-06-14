import Count from './Count'

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = total > 0 ? (good - bad) / (good + neutral + bad) : 0
  const pos = total > 0 ? good / (good + neutral + bad) * 100 : 0

  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <Count text='Good' count={good}/>
        <Count text='Neutral' count={neutral}/>
        <Count text='Bad' count={bad}/>
        <p>Total Count: {total}</p>
        <p>Average: {avg}</p>
        <p>Positive: {pos}%</p>
      </div>
    </div>
  )
}

export default Statistics