import React from "react";

const Persons = (props) =>
{
    const temp1 = [];

    const regex1 = new RegExp(props.filter_persons, "i");

    for (let i = 0; i < props.persons.length; i++)
    {
        if (regex1.test(props.persons[i].name))
        {
            temp1.push(<p key={i}>{props.persons[i].name} {props.persons[i].number}</p>)
        }
    }
    return (
        <div>
            {temp1}
        </div>
    )
}

export default Persons;