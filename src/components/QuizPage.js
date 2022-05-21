import React from "react";
import Quizz from "./Quizz";

const URL = `https://opentdb.com/api.php?amount=5&type=multiple`;

const baseResponse = {
    A: { clicked: false },
    B: { clicked: false },
    C: { clicked: false },
    D: { clicked: false },
};

let FilledQuizz = [];

export default function QuizPage() {
    const [options, setOptions] = React.useState(baseResponse);
    const [questions, setQuestions] = React.useState([]);

    function handleClick(id) {
        setOptions(prev => {
            return {
                ...baseResponse,
                [id]: { clicked: !prev[id].clicked }
            };
        });
    }
    React.useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then(data => {
                if (data.response_code === 0) {
                    return (data.results);
                }
                throw (new Error("err"))
            })
            .then(//save to state 

                data => {
                    //arrenge question ans and selected option
                    setQuestions(data)
                    console.log(data)
                }
            )
            .catch(err => console.log(err))
    }, [])

    if (questions.length > 0) {
        FilledQuizz = questions.map(ele => (<Quizz
            question={ele.question}
            handleClick={handleClick}
            options={options}
            answers={[...ele.incorrect_answers, ele.correct_answer]}
        />))
    }

    return (
        <div className="quizz-page">
            {FilledQuizz}
        </div>
    );
}