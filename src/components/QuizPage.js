import React from "react";
import Quizz from "./Quizz";
import { nanoid } from 'nanoid'


const URL =
    `https://opentdb.com/api.php?amount=5&type=multiple`;

let FilledQuizz = [];


export default function QuizPage() {
    const [userAnswers, setUserAnswers] = React.useState(
        {
            loader: false,
            loadNewQuestion: false
        });
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
        if (!userAnswers.checkAnswer) {
            let score = 0;
            questions.forEach((question) => {
                const correct = question.correct_answer === userAnswers[question.id];
                if (question.id in userAnswers && correct) {
                    score++;
                }
            });
            setUserAnswers(prev => ({ ...prev, checkAnswer: !prev.checkAnswer }));
            console.log(score);
            return
        }
        setUserAnswers(prev => ({ ...prev, loadNewQuestion: !prev.loadNewQuestion, }));
    }

    React.useEffect(() => {
        setUserAnswers(prev => ({ ...prev, loader: true }))
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
            .then(data => {
                setUserAnswers(prev => ({ ...prev, loader: false }))
                setQuestions(data)
            })
            .catch(err => console.log(err))
    }, [userAnswers.loadNewQuestion])

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
            {userAnswers.loader && <div className="loader"></div>}
            {!userAnswers.loader && FilledQuizz}
            {!userAnswers.loader && <button
                className="start-quiz check-answers"
                onClick={checkAnswer}
            >{userAnswers.checkAnswer ? 'Play Again' : 'Check Answers'}</button>}
        </div>
    );
}