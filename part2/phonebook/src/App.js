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

      <Add_to_phonebook
        newName={newName}
        server_data={server_data}
        handle_name_change={handle_name_change}
        handle_number_change={handle_number_change}
        setErrorMessage={setErrorMessage}
        setNotification={setNotification}
        newName={newNumber}
        newNumber={newNumber}
        fetch_server_data={fetch_server_data}
      />

      <h2>Numbers</h2>

      <Persons filter_persons={filter_persons} server_data={server_data} fetch_server_data={fetch_server_data} setErrorMessage={setErrorMessage} setNotification={setNotification} />

    </div>
  )
}

export default App