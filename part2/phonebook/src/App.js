import { useEffect, useState } from 'react'
import Add_to_phonebook from './Add_to_phonebook.js'
import Search_filter from './Search_filter.js'
import Persons from './Persons.js';
import services_persons from './services/services_persons.js';
import Notification from './Notification.js';
import "./index.css"
import ErrorMessage from './ErrorMessage.js';


const App = () =>
{
  //userStates
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter_persons, set_filter_persons] = useState("")
  const [server_data, set_server_data] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)


  const handle_click = async (event) =>
  {
    event.preventDefault()

    for (let i = 0; i < server_data.length; i++)
    {
      if (newName === server_data[i].name)
      {
        // return alert(`${newName} is already added to phonebook`)
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) 
        {
          const temp = await services_persons.update(
            server_data[i].id,
            {
              number: newNumber
            }
          )
          if (temp.message !== undefined)
          {
            setErrorMessage(temp.message)
            return;
          }
          else
          {
            setNotification(`updated ${newName}`)
          }
          (() => fetch_server_data())()
        }
      }
    }
    // const temp_arr = [...persons]
    // temp_arr.push({ name: newName, number: newNumber });
    // setPersons(temp_arr);
    const result0 = await services_persons.create({
      name: newName,
      number: newNumber
    })
    if (result0.message !== undefined)
    {
      setErrorMessage(result0.message)
    }
    else 
    {
      setNotification(`added ${newName}`)
    }



    fetch_server_data()

  }

  //functions
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
      <Notification message={notification} setNotification={setNotification} />
      <ErrorMessage message={errorMessage} setErrorMessage={setErrorMessage} />

      <Search_filter handle_filter_change={handle_filter_change} />
      <h1>add a new</h1>

      <Add_to_phonebook handle_click={handle_click} handle_name_change={handle_name_change} handle_number_change={handle_number_change} />

      <h2>Numbers</h2>

      <Persons filter_persons={filter_persons} server_data={server_data} fetch_server_data={fetch_server_data} setErrorMessage={setErrorMessage} setNotification={setNotification} />

    </div>
  )
}

export default App