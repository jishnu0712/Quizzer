import React from "react";

const styles = {
    backgroundColor: '#D6DBF5',
}

export default function Quizz(props) {
    function clicked(id,ans) {
        console.log(ans);
        props.handleClick(id);
    }

    return (
        <div className="quizz">
            <h2>{props.question}</h2>

            <button className="options"
                onClick={() => { clicked('A',props.answers[0]) }}
                style={(props.options.A.clicked) ? styles : {}}>{props.answers[0]}</button>

            <button className="options"
                onClick={() => { clicked('B',props.answers[1]) }}
                style={(props.options.B.clicked) ? styles : {}}
            >{props.answers[1]}</button>

            <button className="options"
                onClick={() => { clicked('C',props.answers[2]) }}
                style={(props.options.C.clicked) ? styles : {}}
            >{props.answers[2]}</button>

            <button className="options"
                onClick={() => { clicked('D',props.answers[3]) }}
                style={(props.options.D.clicked) ? styles : {}}
            >{props.answers[3]}</button>

        </div>
    )
}