import React from "react";
import Options from "./Options";

const selectedOption = { backgroundColor: '#D6DBF5' }
const correctOption = { backgroundColor: '#94D7A2' }
const incorrectOption = { backgroundColor: '#F8BCBC' }

export default function Quizz(props) {
    const questionID = props.id;
    const [style, setStyle] = React.useState({});

    function handleClick(ans) {
        setStyle(getColor(ans));
        props.handleOptionClick(questionID, ans);
    }

    function getColor(ans) {
        if (props.userAnswers.checkAnswer) { //check correct ans
            if (questionID in props.userAnswers) {
                if (ans === props.correct_answer) return correctOption;
                return incorrectOption;
            }
            return {};
        }//mark selection
        else {
            if(ans === props.userAnswers[questionID]){
                return selectedOption;
            }
            else return {};
        }
    }


    const optionsArr = props.answers.map(ele => (
        <Options
            optionText={ele}
            handleClick={handleClick}
            styles={style}
        />))

    return (
        <div className="quizz">
            <h2>{props.question}</h2>
            {optionsArr}
        </div>
    )
}