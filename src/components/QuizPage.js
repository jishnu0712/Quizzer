import React from "react";
import Quizz from "./Quizz";

const baseResponse = {
    A: { clicked: false },
    B: { clicked: false },
    C: { clicked: false },
    D: { clicked: false },
};

// let results = [
//     {
//         "category": "Entertainment: Music",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "Which of the following guitarists recorded an album as a member of the Red Hot Chili Peppers?",
//         "correct_answer": "Dave Navarro",
//         "incorrect_answers": [
//             "Tom Morello ",
//             "Billy Corgan",
//             "Ed O&#039;Brien"
//         ]
//     }]

export default function QuizPage() {
    const [options, setOptions] = React.useState(baseResponse);

    function handleClick(id) {
        setOptions(prev => {
            return {
                ...baseResponse,
                [id]: { clicked: !prev[id].clicked }
            };
        });
    }
    let question = 'who built Taj?'
    return (
        <div className="quizz-page">
            <Quizz
                question={question}
                handleClick={handleClick}
                options={options}
            />
        </div>
    );
}