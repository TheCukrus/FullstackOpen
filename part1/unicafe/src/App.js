import { useState } from 'react'

const App = () =>
{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handle_good_click = () => setGood(good + 1)
  const handle_neutral_click = () => setNeutral(neutral + 1)
  const handle_bad_click = () => setBad(bad + 1)


  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handle_good_click}>good</button>
      <button onClick={handle_neutral_click}>neutral</button>
      <button onClick={handle_bad_click}>bad</button>

      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App