import React from "react";
import Quizz from "./Quizz";
import { nanoid } from 'nanoid'


const URL =
    `https://opentdb.com/api.php?amount=5&type=multiple`;

let FilledQuizz = [];


export default function QuizPage() {
    const [userAnswers, setUserAnswers] = React.useState({});
    const [questions, setQuestions] = React.useState([]);

    function handleOptionClick(questionID, ans) {

        setUserAnswers(prev => (
            {
                ...prev,
                [questionID]: ans,
                checkAnswer: false,
            }
        ));
    }

    function checkAnswer() {
        let score = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].id in userAnswers) {
                if (questions[i].correct_answer === userAnswers[questions[i].id]) {
                    score++;
                }
            }
        }
        setUserAnswers(prev => (
            {
                ...prev, checkAnswer: !prev.checkAnswer
            }));
        console.log(score);
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
            .then(data => {
                //add id in question
                return data.map(ele => ({ ...ele, id: nanoid() }))
            })
            .then(data => setQuestions(data))
            .catch(err => console.log(err))
    }, [])

    if (questions.length > 0) {
        FilledQuizz = questions.map(ele => (<Quizz
            key={ele.id}

            id={ele.id}
            handleOptionClick={handleOptionClick}
            question={ele.question}
            userAnswers={userAnswers}
            correct_answer={ele.correct_answer}
            answers={[...ele.incorrect_answers, ele.correct_answer]}
        />))
    }

    return (
        <div className="quizz-page">
            {FilledQuizz}
            <button
                className="start-quiz check-answers"
                onClick={checkAnswer}
            >Check Answers</button>
        </div>
    );
}