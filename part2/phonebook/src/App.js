import { useState } from 'react'
import Add_to_phonebook from './Add_to_phonebook'
import Search_filter from './Search_filter'
import axios from "axios";
import Persons from './Persons';


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




  const promise = axios.get("http://localhost:3001/persons")

  console.log(promise)
  return (
    <div>
      <h2>Phonebook</h2>

      <Search_filter handle_filter_change={handle_filter_change} />
      <h1>add a new</h1>

      <Add_to_phonebook handle_click={handle_click} handle_name_change={handle_name_change} handle_number_change={handle_number_change} />

      <h2>Numbers</h2>

      <Persons  persons={persons} filter_persons={filter_persons}/>

    </div>
  )
}

export default App