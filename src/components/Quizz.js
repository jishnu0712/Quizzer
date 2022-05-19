import React from "react";

export default function Quizz(props) {
    function clicked(id) {
        props.handleClick(id);
    }

    return (
        <div className="quizz">
            <h2>Who built taj mahal?</h2>

            <button className={(props.options.A.clicked) ? "options selected" : "options"}
                onClick={() => { clicked('A') }}>Option A</button>

            <button className={(props.options.B.clicked) ? "options selected" : "options"}
                onClick={() => { clicked('B') }}>Option B</button>

            <button className={(props.options.C.clicked) ? "options selected" : "options"}
                onClick={() => { clicked('C') }}>Option C</button>

            <button className={(props.options.D.clicked) ? "options selected" : "options"}
                onClick={() => { clicked('D') }}>Option D</button>

        </div>
    )
}