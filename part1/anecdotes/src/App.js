import { useState } from 'react'

const App = () =>
{
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [arr_of_votes, set_arr_of_votes] = useState([0, 0, 0, 0, 0, 0, 0])

  const handle_random_click = () =>
  {
    const temp = Math.floor(Math.random() * (anecdotes.length - 1));
    setSelected(temp)
  }

  const handle_vote_add = () =>
  {
    const votes_copy = [...arr_of_votes];
    votes_copy[selected]++
    set_arr_of_votes(votes_copy)

  }

  const most_voted = () =>
  {
    let temp = arr_of_votes[0]
    for (let i = 0; i < arr_of_votes.length; i++)
    {
      if (temp < arr_of_votes[i])
      {
        temp = arr_of_votes[i]
      }
    }
    return temp;
  }

  const temp1 = () =>
  {
    let count = 0;
    let temp = arr_of_votes[0]
    for (let i = 0; i < arr_of_votes.length; i++)
    {
      if (temp < arr_of_votes[i])
      {
        temp = arr_of_votes[i] 
       count = i
      }
    }
    return count;
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br />

      <p>has {arr_of_votes[selected]} votes</p>
      <button onClick={handle_vote_add} >vote</button>
      <button onClick={handle_random_click}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[temp1()]}
      <p>has {most_voted()} votes</p>
    </div>
  )
}

export default App