import { useState } from 'react'

const App = () =>
{
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

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
    temp_arr.push({ name: newName });
    setPersons(temp_arr);
  }

  const handle_change = (event) =>
  {

    setNewName(event.target.value);
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form onChange={handle_change} onSubmit={handle_click}>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((ele, i) => <p key={i}>{ele.name}</p>)}
    </div>
  )
}

export default App