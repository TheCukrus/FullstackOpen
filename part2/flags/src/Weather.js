import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = (props) =>
{
    const [weather_in_f, set_weather_in_f] = useState("");
    const [wind, set_wind] = useState("");
    const [weather, set_weather] = useState("");

    const api_key = "1e049bc5a6c197798505ba15c8a0e8cf";

    const temp_converter = (f) =>
    {
        const temp = f - 273.15;
        return temp.toFixed(2)
    }

    const temp1 = async () =>
    {
        try
        {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.country1.capital[0]}&appid=${api_key}`
            const result1 = await axios.get(url)
            console.log(result1.data)
            set_weather_in_f(result1.data["main"]["temp"])
            set_wind(result1.data.wind.speed)
            set_weather(result1.data.weather["0"].icon)
        }
        catch (err)
        {
            console.log(err)
        }
    }
    useEffect(temp1, [])

    const img = `http://openweathermap.org/img/wn/${weather}@2x.png`
    return (
        <div>
            <h1>Weather in {props.country1.capital[0]}</h1>
           <p>temperature {temp_converter(weather_in_f)} Celsius</p> 

       <img src={img}/>

           <p>wind {wind} m/s</p>
        </div>
    )


}

export default Weather; 