import { useState } from "react"
import Header from './Components/Header'
import Button from './Components/Button'
import Statistics from "./Components/Statistics"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {setGood(good + 1)}
  const handleNeutralClick = () => {setNeutral(neutral + 1)}
  const handleBadClick = () => {setBad(bad + 1)}

  return (
    <div>
      <Header />
      <div direction="row">
        <Button text='Good' onClick={handleGoodClick}/>
        <Button text='Neutral' onClick={handleNeutralClick}/>
        <Button text='Bad' onClick={handleBadClick}/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App