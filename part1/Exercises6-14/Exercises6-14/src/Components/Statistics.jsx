import StatsLine from './StatsLine'

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = (good - bad) / (good + neutral + bad)
  const pos = good / (good + neutral + bad) * 100

  return (
    (total > 0 ?
    <div>
      <h2>Statistics</h2>
      <div>
        <StatsLine text='Good' stat={good}/>
        <StatsLine text='Neutral' stat={neutral}/>
        <StatsLine text='Bad' stat={bad}/>
        <StatsLine text='Total Count' stat={total}/>
        <StatsLine text='Average' stat={avg}/>
        <StatsLine text='Positive' stat={pos}/>
      </div>
    </div> :
    <div><p>No feedback given</p></div>
    ))
}

export default Statistics