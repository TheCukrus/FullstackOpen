const Total = (props) =>
{
  let sum = 0

  for (let i = 0; i < props.parts.length; i++)
  {
    sum = sum + props.parts[i].exercises
  }
    return (
      <div>
               <h3>total of {sum}  exercises</h3>

      </div>
    )
}

export default Total