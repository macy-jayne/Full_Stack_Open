import { useState } from "react"
import Header from './Components/Header'
import Button from './Components/Button'
import Stat from './Components/Stat'

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
      <h2>Statistics</h2>
      <div>
        <Stat text='Good' count={good}/>
        <Stat text='Neutral' count={neutral}/>
        <Stat text='Bad' count={bad}/>
      </div>
    </div>
  )
}

export default App