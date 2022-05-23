import React from 'react';
import './App.css';
import "./components/LandingPage"
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';


export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false);

  function handleClick() {
    setGameStarted(prev => !prev);
  }
  
  return (
    <>
      {!gameStarted && <LandingPage
        handleClick={handleClick} />}
      
      {gameStarted && <QuizPage />}
    </>
  );
}
