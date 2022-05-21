import React from 'react';

export default function Options(props) {
    return (
        <button
            className="options"
            onClick={() => {
                props.handleClick(props.optionText)
            }}
            style={props.styles}
        >
            {props.optionText}
        </button>

    )
}