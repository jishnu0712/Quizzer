import React from 'react';

export default function Options(props) {
    return (

        <button
            className="options"
            onClick={() => { props.clicked() }}
            style={{}}
        >
            {props.optionText}
        </button>

    )
}