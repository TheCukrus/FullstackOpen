import { useEffect, useState } from 'react'
import Add_to_phonebook from './Add_to_phonebook'
import Search_filter from './Search_filter'
import axios from "axios";
import Persons from './Persons';


const App = () =>
{
  //userStates
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter_persons, set_filter_persons] = useState("")
  const [server_data, set_server_data] = useState("")



  const handle_click = async (event) =>
  {
    event.preventDefault()

    for (let i = 0; i < server_data.length; i++)
    {
      if (newName === server_data[i].name)
      {
        return alert(`${newName} is already added to phonebook`)
      }
    }
    // const temp_arr = [...persons]
    // temp_arr.push({ name: newName, number: newNumber });
    // setPersons(temp_arr);
    const temp = await axios({
      method: "post",
      url: "http://localhost:3001/persons",
      data: {
        name: newName,
        number: newNumber
      }
    })
    fetch_server_data()

  }

  const handle_name_change = (event) => setNewName(event.target.value);
  const handle_number_change = (event) => setNewNumber(event.target.value)
  const handle_filter_change = (event) => set_filter_persons(event.target.value)



  const fetch_server_data = async () =>
  {
    try
    {
      const result1 = await axios.get("http://localhost:3001/persons")
      set_server_data(result1.data)
      console.log(result1.data)
    }
    catch (err)
    {
      console.log(err);
    }
  }

  useEffect(fetch_server_data, [])
  return (
    <div>
      <h2>Phonebook</h2>

      <Search_filter handle_filter_change={handle_filter_change} />
      <h1>add a new</h1>

      <Add_to_phonebook handle_click={handle_click} handle_name_change={handle_name_change} handle_number_change={handle_number_change} />

      <h2>Numbers</h2>

      <Persons filter_persons={filter_persons} server_data={server_data} />

    </div>
  )
}

export default App