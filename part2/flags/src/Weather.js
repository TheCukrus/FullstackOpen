import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = (props) =>
{
    const [weather_in_f, set_weather_in_f] = useState("")
    const api_key = "1e049bc5a6c197798505ba15c8a0e8cf";

    const temp_converter = (f) =>
    {
        const temp = (f-32)/1800;
        return temp
    }
    
    let result2;
    const temp1 = async () =>
    {
        try
        {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.country1.capital[0]}&appid=${api_key}`
            const result1 = await axios.get(url)

            console.log(result1.data)
         result2 = result1.data.main.temp
       
        }
        catch (err)
        {
            console.log(err)
        }
    }
    

    useEffect(temp1,[])
    return (
        <div>
            <h1>Weather in {props.country1.capital[0]}</h1>
      {result2}

        </div>
    )
}

export default Weather;