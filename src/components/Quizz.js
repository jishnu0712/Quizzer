import React from "react";
import Options from "./Options";
import he from 'he';

const selectedOptionStyle = { backgroundColor: '#D6DBF5' }
const correctOption = { backgroundColor: '#94D7A2' }
const incorrectOption = { backgroundColor: '#F8BCBC' }

export default function Quizz(props) {
    const questionID = props.id;

    function handleClick(ans) {
        props.handleOptionClick(questionID, ans);
    }

    const optionsArr = props.answers.map(ele => { //simplify
        let styles = {};
        const elementIsSelect = (ele === props.userAnswers[questionID]);

        if (elementIsSelect && props.userAnswers.checkAnswer) {
            if (ele === props.correct_answer) {
                styles = correctOption;
            } else {
                styles = incorrectOption;
            }
        }
        else if (elementIsSelect) {
            styles = selectedOptionStyle;
        }
        else if (props.userAnswers.checkAnswer) {
            if (ele === props.correct_answer) {
                styles = correctOption;
            }
        }

        return (<Options
            key={ele}
            optionText={he.decode(ele)}
            handleClick={handleClick}
            styles={styles}
        />)
    })

    return (
        <div className="quizz">
            <h2>{he.decode(props.question)}</h2>
            {optionsArr}
        </div>
    )
}