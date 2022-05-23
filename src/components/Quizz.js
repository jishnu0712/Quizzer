import React from "react";
import Options from "./Options";

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
            optionText={ele}
            handleClick={handleClick}
            styles={styles}
        />)
    })

    function convert(string) {
        return string.replace(/&#(?:x([\da-f]+)|(\d+));/ig, function (_, hex, dec) {
            return String.fromCharCode(dec || +('0x' + hex))
        })
    }
    let question = convert(props.question);
    question = question.replaceAll("&quot;", '"');

    return (
        <div className="quizz">
            <h2>{question}</h2>
            {optionsArr}
        </div>
    )
}