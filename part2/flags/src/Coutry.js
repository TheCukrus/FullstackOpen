import React from "react";

const Country = (props) =>
{

    const country_arr = [];
    const regexp = new RegExp(props.filter_country, "i");



    //=> is countries traukiam pavadinimus
    for (let i = 0; i < props.countries.length; i++)
    {
        if (regexp.test(props.countries[i].name.common))
        {
            country_arr.push(<p key={i}>{props.countries[i].name.common} <button onClick={()=>props.set_filter_country(props.countries[i].name.common)}>show</button></p>)

        }
        if (country_arr.length > 10)
        {
            return <p>Too many matches, specify another filter</p>
        }
    }


    if (country_arr.length === 1)
    {
        let country1;

        for (let i = 0; i < props.countries.length; i++)
        {
            if (regexp.test(props.countries[i].name.common))
            {
                country1 = props.countries[i];
            }
        }
        //ieskoma salis

        const arr_languages = []
        let a = 0;
        for (let temp in country1.languages)
        {
            //   console.log(temp, country1.languages[temp])
            arr_languages.push(<li key={++a}>{country1.languages[temp]}</li>)
        }//isvedamos kalbos

        return (
            <div>
                <h1>{country1.name.common}</h1>
                <p>Capital {country1.capital[0]}</p>
                <p>Area {country1.area}</p>
                <h3>languages:</h3>
                <ul>
                    {arr_languages}
                </ul>
              <img src={country1.flags["png"]}/>
            </div>
        )
    }




    return (
        <div>{country_arr}</div>
    )
}
export default Country;