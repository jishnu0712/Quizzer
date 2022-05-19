import React from 'react';
import './App.css';
import "./components/LandingPage"
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';


export default function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);

  function handleClick() {
    setQuizStarted(prev => !prev);
  }
  return (
    <>
      { !quizStarted && <LandingPage
        handleClick={handleClick}  />}
        
      { quizStarted && <QuizPage/>}
    </>
  );
}
