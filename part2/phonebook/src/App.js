import { useEffect, useState } from 'react'
import Add_to_phonebook from './Add_to_phonebook'
import Search_filter from './Search_filter'
import Persons from './Persons';
import services_persons from './services/services_persons';


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
    services_persons.create({
      name: newName,
      number: newNumber
    })
    
    fetch_server_data()

  }

  const handle_name_change = (event) => setNewName(event.target.value);
  const handle_number_change = (event) => setNewNumber(event.target.value)
  const handle_filter_change = (event) => set_filter_persons(event.target.value)



  const fetch_server_data = async () =>
  {
    const result1 = await services_persons.getAll()
    set_server_data(result1.data)
    console.log(result1.data)

  }

  useEffect(fetch_server_data, [])
  return (
    <div>
      <h2>Phonebook</h2>

      <Search_filter handle_filter_change={handle_filter_change} />
      <h1>add a new</h1>

      <Add_to_phonebook handle_click={handle_click} handle_name_change={handle_name_change} handle_number_change={handle_number_change} />

      <h2>Numbers</h2>

      <Persons filter_persons={filter_persons} server_data={server_data} fetch_server_data={fetch_server_data}  />

    </div>
  )
}

export default App