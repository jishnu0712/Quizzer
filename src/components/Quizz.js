import React from "react";
import Options from "./Options";
import { nanoid } from "nanoid";

const selectedOptionStyle = { backgroundColor: '#D6DBF5' }
const correctOption = { backgroundColor: '#94D7A2' }
const incorrectOption = { backgroundColor: '#F8BCBC' }

export default function Quizz(props) {
    const [quizzContent, setQuizzContent] = React.useState({ style: {}, selectedOption: '' });

    const questionID = props.id;
    function handleClick(ans) {
        setQuizzContent({ style: selectedOptionStyle, selectedOption: ans });
        props.handleOptionClick(questionID, ans);
    }

    // function getColor(ans) {
    //     if (props.userAnswers.checkAnswer) { //check correct ans
    //         if (questionID in props.userAnswers) {
    //             if (ans === props.correct_answer) return correctOption;
    //             return incorrectOption;
    //         }
    //         return {};
    //     }//mark selection
    //     else {
    //         if (ans === props.userAnswers[questionID]) {
    //             return selectedOptionStyle;
    //         }
    //         else return {};
    //     }
    // }


    const optionsArr = props.answers.map(ele => {
        return (ele === quizzContent.selectedOption) ?
            <Options
                optionText={ele}
                handleClick={handleClick}
                styles={quizzContent.style}
            /> :
            <Options
                optionText={ele}
                handleClick={handleClick}
                styles={{}}
            />
    })

    return (
        <div className="quizz">
            <h2>{props.question}</h2>
            {optionsArr}
        </div>
    )
}