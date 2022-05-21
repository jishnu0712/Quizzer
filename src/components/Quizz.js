import React from "react";
import Options from "./Options";

const selectedOption = { backgroundColor: '#D6DBF5' }
const correctOption = { backgroundColor: '#94D7A2' }
const incorrectOption = { backgroundColor: '#F8BCBC' }

export default function Quizz(props) {
    const questionID = props.id;
    const selectedAnswer = props.userAnswers[questionID];

    function clicked(ans) {
        props.handleClick(questionID, ans);
    }
    function getColor(ans) {
        if (props.userAnswers.checkAnswer) {
            if (ans === props.correct_answer) return correctOption
            return incorrectOption
        }
        return (ans === selectedAnswer) ? selectedOption : {}
    }

    const optionsArr = props.answers.map(ele => (
        <Options
            optionText={ele}
            clicked={clicked}
        />))

    return (
        <div className="quizz">
            <h2>{props.question}</h2>
            {optionsArr}
        </div>
    )
}