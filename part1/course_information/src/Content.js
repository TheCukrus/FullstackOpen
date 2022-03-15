import Part from "./Part"

const Content = (props) =>
{
    const arr = [];
    for (let i = 0; i < props.parts.length; i++)
    {
        const temp = <Part key={i} name={props.parts[i].name} number_of_exercises={props.parts[i].exercises} />
        arr.push(temp)
    }
    return (
        <div>
            {arr}
        </div>
    )
}

export default Content