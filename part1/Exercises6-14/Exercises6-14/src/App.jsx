import { useState } from "react"
import Header from './Components/Header'
import Button from './Components/Button'
import Count from './Components/Count'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [pos, setPos] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + neutral + bad
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverage((updatedGood - bad) / updatedTotal)
    setPos((updatedGood / updatedTotal) * 100)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = good + updatedNeutral + bad
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAverage((good - bad) / updatedTotal)
    setPos((good / updatedTotal) * 100)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedTotal = good + neutral + updatedBad
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAverage((good - updatedBad) / updatedTotal)
    setPos((good / updatedTotal) * 100)
  }

  return (
    <div>
      <Header />
      <div direction="row">
        <Button text='Good' onClick={handleGoodClick}/>
        <Button text='Neutral' onClick={handleNeutralClick}/>
        <Button text='Bad' onClick={handleBadClick}/>
      </div>
      <h2>Statistics</h2>
      <div>
        <Count text='Good' count={good}/>
        <Count text='Neutral' count={neutral}/>
        <Count text='Bad' count={bad}/>
        <p>Total Count: {total}</p>
        <p>Average: {average}</p>
        <p>Positive: {pos}%</p>
      </div>
    </div>
  )
}

export default App