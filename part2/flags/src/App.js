import axios from "axios"
import React, { useEffect, useState } from "react";
import Country from "./Coutry";

function App()
{
  const [filter_country, set_filter_country] = useState("")
  const [countries, set_countries] = useState("")

  const temp = async () =>
  {
    try
    {
      const result1 = await axios.get('https://restcountries.com/v3.1/all')
      set_countries(result1.data)
      console.log(result1.data)
    }
    catch (err)
    {
      console.log(err)
    }
  }
  const handle_filter_country = (event) => set_filter_country(event.target.value)


  useEffect(temp, [])
  const country_filter = [];








  return (
    <div>
      <p>find countries <input onChange={handle_filter_country} /></p>
      {country_filter}
      <Country countries={countries} filter_country={filter_country} />

    </div>
  );
}

export default App;
