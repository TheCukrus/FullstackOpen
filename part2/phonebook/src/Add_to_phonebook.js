import React from "react";

const Add_to_phonebook = (props) =>
{

    return (
        <div>
            <form onSubmit={props.handle_click} >
                <h1>add a new</h1>
                <div>name: <input onChange={props.handle_name_change} /></div>
                <div>number: <input onChange={props.handle_number_change} /></div>
                <div><button type="submit" >add</button></div>
            </form>
        </div>
    )
}


export default Add_to_phonebook;