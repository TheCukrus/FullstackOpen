import React from "react";

const Buttons = (props) =>
{


    return (
        <div>
            <button onClick={props.handle_good_click}>good</button>
            <button onClick={props.handle_neutral_click}>neutral</button>
            <button onClick={props.handle_bad_click}>bad</button>
        </div>
    )
}

export default Buttons;