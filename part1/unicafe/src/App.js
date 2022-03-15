import { useState } from 'react'
import Buttons from './Buttons'
import Statistics from './Statistics'

const App = () =>
{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handle_good_click = () => setGood(good + 1)
  const handle_neutral_click = () => setNeutral(neutral + 1)
  const handle_bad_click = () => setBad(bad + 1)

  const average = () =>
  {

    let sum = 0;
    sum = sum + good;
    sum = sum - bad;
    sum = sum / (good + neutral + bad)
    return sum;


  }
  return (
    <div>
      <h2>give feedback</h2>
      <Buttons handle_good_click={handle_good_click} handle_neutral_click={handle_neutral_click} handle_bad_click={handle_bad_click} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average()} />
    </div>
  )
}

export default App