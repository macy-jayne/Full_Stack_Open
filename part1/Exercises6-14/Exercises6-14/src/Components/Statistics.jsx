import Count from './Count'

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = (good - bad) / (good + neutral + bad)
  const pos = good / (good + neutral + bad) * 100

  return (
    (total > 0 ?
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
    </div> :
    <div><p>No feedback given</p></div>
    ))
}

export default Statistics