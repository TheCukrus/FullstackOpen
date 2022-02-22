import Part from "./Part"

const Content = (props) =>
{
return (
    <div>
        <Part name={props.part1.name} number_of_exercises={props.part1.exercises}/>
        <Part name={props.part2.name} number_of_exercises={props.part2.exercises}/>
        <Part name={props.part3.name} number_of_exercises={props.part3.exercises}/> 
    </div>
)
}

export default Content