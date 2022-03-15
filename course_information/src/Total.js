const Total = (props) =>
{
  let sum = 0

  for (let i = 0; i < props.parts.length; i++)
  {
    sum = sum + props.parts[i].exercises
  }
    return (
      <div>
        <p>Number of exercises {sum}</p>
      </div>
    )
}

export default Total