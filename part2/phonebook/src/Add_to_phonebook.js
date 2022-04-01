import React from "react";
import services_persons from "./services/services_persons.js";

const Add_to_phonebook = (props) =>
{

    const handle_click = async (event) =>
    {
        const person = props.server_data.find((ele) => ele.name === props.newName)

        if (person === undefined)
        {
            //creating new record
            const result0 = await services_persons.create({
                name: props.newName,
                number: props.newNumber
            })
            if (result0.message !== undefined)
            {
                props.setErrorMessage(result0.message)
            }
            else 
            {
                props.setNotification(`added ${props.newName}`)
            }

        }
        else
        {
            //updating record
            if (window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)) 
            {
                const temp = await services_persons.update(
                    props.server_data[person].id,
                    {
                        number: props.newNumber
                    }
                )
                if (temp.message !== undefined)
                {
                    props.setErrorMessage(temp.message)
                    return;
                }
                else
                {
                    props.setNotification(`updated ${props.newName}`)
                }

            }
        }
        props.fetch_server_data()
    }


    return (
        <div>
            <form onSubmit={handle_click} >
                <div>name: <input onChange={props.handle_name_change} /></div>
                <div>number: <input onChange={props.handle_number_change} /></div>
                <div><button type="submit" >add</button></div>
            </form>
        </div>
    )
}


export default Add_to_phonebook;