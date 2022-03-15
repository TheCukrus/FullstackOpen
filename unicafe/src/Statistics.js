const Statistics = (props) =>
{
    return (
        <div>
            <h2>statistics</h2>
            <p>good {props.good}</p>
            <p>neutral {props.neutral}</p>
            <p>bad {props.bad}</p>
            <p>all {props.good + props.neutral + props.bad}</p>
            <p>average {props.average()}</p>
            <p>positive {(props.good) / (props.good + props.neutral + props.bad) * 100}%</p>

        </div>
    )
}

export default Statistics;