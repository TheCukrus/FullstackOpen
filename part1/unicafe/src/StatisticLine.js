import React from "react";

const StatisticLine = (props) =>
{
    return (
        <div>
           <p>average {props.average()}</p>
        </div>
    )
}

export default StatisticLine;