const Total = (props) =>
{
  // let sum = 0

  // for (let i = 0; i < props.parts.length; i++)
  // {
  //   sum = sum + props.parts[i].exercises
  // }

  const total = props.parts.reduce((s, p) =>s + p.exercises,0)
  return (
    <div>
      <h3>total of {total}  exercises</h3>
    </div>
  )
}

export default Total