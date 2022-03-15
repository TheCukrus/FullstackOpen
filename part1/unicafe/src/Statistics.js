import StatisticLine from "./StatisticLine.js";

const Statistics = (props) =>
{
    if ((props.good === 0) && (props.bad === 0) && (props.neutral === 0))
    {
        return (
            <div>

                <p>No feedback given</p>
            </div>
        )
    }
    return (


        <table>
            <tbody>
                <StatisticLine text="good" value={props.good} />
                <StatisticLine text="neutral" value={props.neutral} />
                <StatisticLine text="bad" value={props.bad} />
                <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
                <StatisticLine text="average" value={props.average} />
                <StatisticLine text="positive" value={(props.good) / (props.good + props.neutral + props.bad) * 100} />
            </tbody>
        </table>

    )
}

export default Statistics;