import React from "react";
import services_persons from "./services/services_persons";

const Persons = (props) =>
{
    const temp1 = [];

    const regex1 = new RegExp(props.filter_persons, "i");

    for (let i = 0; i < props.server_data.length; i++)
    {
        if (regex1.test(props.server_data[i].name))
        {
            temp1.push(<p key={i}>{props.server_data[i].name} {props.server_data[i].number} <button onClick={async() =>
            {

                if (window.confirm(`delete ${props.server_data[i].name}`))
                {
                    try
                    {
                       await services_persons.remove(props.server_data[i].id)
                       props.setNotification(`deleted ${props.server_data[i].name}`)
                    }
                    catch(err)
                    {
                        props.setErrorMessage(err.message)
                    }
                  

                }

            }}>delete</button></p>)

        }
    }

    return (
        <div>
            {temp1}
        </div>
    )
}

export default Persons;