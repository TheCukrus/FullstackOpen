import StatisticLine from "./StatisticLine.js";

const Statistics = (props) =>
{
    if ((props.good === 0) && (props.bad === 0) && (props.neutral === 0))
    {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <h1>statistics</h1>
            <p>good {props.good}</p>
            <p>neutral {props.neutral}</p>
            <p>bad {props.bad}</p>
            <p>all {props.good + props.neutral + props.bad}</p>
            <StatisticLine average={props.average} />
            <p>positive {(props.good) / (props.good + props.neutral + props.bad) * 100}%</p>

        </div>
    )
}

export default Statistics;