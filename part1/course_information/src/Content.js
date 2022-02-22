import Part from "./Part"

const Content = (props) =>
{
return (
    <div>
        <Part name={props.part1} number_of_exercises={props.exercises1}/>
        <Part name={props.part2} number_of_exercises={props.exercises2}/>
        <Part name={props.part3} number_of_exercises={props.exercises3}/> 
    </div>
)
}

export default Content