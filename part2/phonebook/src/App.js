import { useState } from 'react'

const App = () =>
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter_persons, set_filter_persons] = useState("")



  const handle_click = (event) =>
  {
    event.preventDefault()

    for (let i = 0; i < persons.length; i++)
    {
      if (newName === persons[i].name)
      {
        return alert(`${newName} is already added to phonebook`)
      }

    }
    const temp_arr = [...persons]
    temp_arr.push({ name: newName, number: newNumber });
    setPersons(temp_arr);
  }

  const handle_name_change = (event) => setNewName(event.target.value);
  const handle_number_change = (event) => setNewNumber(event.target.value)

  const handle_filter_change = (event) => set_filter_persons(event.target.value)

  const temp1 = [];
  const regex1 = new RegExp(filter_persons,"i");
  
  for (let i = 0; i < persons.length; i++)
  {
    if (regex1.test(persons[i].name))
    {
      temp1.push(<p key={i}>{persons[i].name} {persons[i].number}</p>)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <p>filter shown with <input onChange={handle_filter_change} /></p>

      <form onSubmit={handle_click} >
        <h1>add a new</h1>
        <div>name: <input onChange={handle_name_change} /></div>
        <div>number: <input onChange={handle_number_change} /></div>
        <div><button type="submit" >add</button></div>
      </form>
      <h2>Numbers</h2>

      {temp1}
      {/* {persons.map((ele, i) => <p key={i}>{ele.name} {ele.number}</p>)} */}
    </div>
  )
}

export default App