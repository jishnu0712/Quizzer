import React from "react";
import Quizz from "./Quizz";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const URL = `https://opentdb.com/api.php?amount=5&type=multiple`;

let FilledQuizz = [];

export default function QuizPage() {
    const [questions, setQuestions] = React.useState([]);
    const [userAnswers, setUserAnswers] = React.useState(
        {
            checkAnswer: false,
            loader: false,
            loadNewQuestion: false,
            score: 0,
        });

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
            setUserAnswers(prev => ({ ...prev, score: score, checkAnswer: !prev.checkAnswer }));
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
        async function fetchQuestion() {
            try {
                const response = await fetch(URL);
                if (!response.ok) { //response.response_code !== 0
                    throw Error('could not fetch question');
                }
                const data = await response.json();
                let modifiedQuestions = data.results.map(ele => {
                    ele['id'] = nanoid(); //insert id
                    let answers = [...ele.incorrect_answers, ele.correct_answer];
                    answers.sort(() => (Math.random() > 0.5) ? 1 : -1); //randomize answers
                    ele['answers'] = answers;
                    return ele;
                })
                setQuestions(modifiedQuestions);
                setUserAnswers(prev => ({ ...prev, loader: false }));
            }
            catch (err) { console.error(err.message); }
        }
        fetchQuestion();
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
            {userAnswers.checkAnswer && userAnswers.score > 3 && <Confetti />}
            {!userAnswers.loader && <button
                className="start-quiz check-answers"
                onClick={checkAnswer}
            >{userAnswers.checkAnswer ? 'Play Again' : 'Check Answers'}</button>}
        </div>
    );
}