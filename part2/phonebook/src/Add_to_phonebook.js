import React from "react";
import services_persons from "./services/services_persons.js";

const Add_to_phonebook = (props) =>
{

    const handle_click = async (event) =>
    {
        const person = props.server_data.find((ele) => ele.name === newName)

        if (person === undefined)
        {
            //creating new record
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

        }
        else
        {
            //updating record
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) 
            {
                const temp = await services_persons.update(
                    props.server_data[i].id,
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
                    props.setNotification(`updated ${newName}`)
                }

            }
        }
        fetch_server_data()
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