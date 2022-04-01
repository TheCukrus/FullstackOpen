import React from "react";

const Search_filter = (props) =>
{
    return (
        <div>
            <p>filter shown with <input onChange={props.handle_filter_change} /></p>
        </div>
    )
}

export default Search_filter;