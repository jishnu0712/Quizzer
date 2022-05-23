import React from "react";
import Quizz from "./Quizz";
import { nanoid } from 'nanoid'


const URL =
    `https://opentdb.com/api.php?amount=5&type=multiple`;

let FilledQuizz = [];

export default function QuizPage() {
    const [userAnswers, setUserAnswers] = React.useState(
        {
            checkAnswer: false,
            loader: false,
            loadNewQuestion: false,
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
        setUserAnswers(prev => ({
            ...prev,
            checkAnswer: false,
            loadNewQuestion: !prev.loadNewQuestion,
        }));
    }

    React.useEffect(() => {
        setUserAnswers(prev => ({ ...prev, loader: true }));
        try {
            async function fetchData() {
                const response = await fetch(URL);
                const data = await response.json();
                if (data.response_code !== 0) {
                    throw (new Error("err"))
                }
                const results = await data.results;

                let modifiedQuestions = results.map(ele => {
                    ele['id'] = nanoid();
                    let answers = [...ele.incorrect_answers, ele.correct_answer];
                    answers.sort(() => (Math.random() > 0.5) ? 1 : -1);
                    ele['answers'] = answers;
                    return ele;
                })
                setQuestions(modifiedQuestions);
                setUserAnswers(prev => ({ ...prev, loader: false }));
            }
            fetchData();
        }
        catch (err) { console.log(err) }
    }, [userAnswers.loadNewQuestion])

    if (questions.length > 0) {
        FilledQuizz = questions.map(ele => {
            return (<Quizz
                key={ele.id}

                id={ele.id}
                handleOptionClick={handleOptionClick}
                question={ele.question}
                userAnswers={userAnswers}
                correct_answer={ele.correct_answer}
                answers={ele.answers}
            />)
        })
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