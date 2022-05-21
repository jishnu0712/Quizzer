import React from "react";
import Options from "./Options";
import { nanoid } from "nanoid";

const selectedOptionStyle = { backgroundColor: '#D6DBF5' }
const correctOption = { backgroundColor: '#94D7A2' }
const incorrectOption = { backgroundColor: '#F8BCBC' }

export default function Quizz(props) {
    const questionID = props.id;

    function handleClick(ans) {
        props.handleOptionClick(questionID, ans);
    }


    const optionsArr = props.answers.map(ele => {
        if (ele === props.userAnswers[questionID]) {
            if (props.userAnswers.checkAnswer) {
                if (ele === props.correct_answer) {
                    return (<Options
                        optionText={ele}
                        handleClick={handleClick}
                        styles={correctOption}
                    />)
                } else {
                    return (<Options
                        optionText={ele}
                        handleClick={handleClick}
                        styles={incorrectOption}
                    />)
                }

            }
            return (<Options
                optionText={ele}
                handleClick={handleClick}
                styles={selectedOptionStyle}
            />)
        }
        else {
            return (<Options
                optionText={ele}
                handleClick={handleClick}
                styles={{}}
            />)
        }
    })

    return (
        <div className="quizz">
            <h2>{props.question}</h2>
            {optionsArr}
        </div>
    )
}