import React from 'react';
import './App.css';
import "./components/LandingPage"
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';


export default function App() {
  const [gameStats, setGameStats] = React.useState({ gameStarted: false, shownAnswer: false });

  function handleClick() {
    setGameStats(prev => ({ ...prev, gameStarted: !prev.gameStarted }));
  }
  function showScore() {
    setGameStats(prev => ({ ...prev, shownAnswer: !prev.shownAnswer }))
  }
  return (
    <>
      {!gameStats.gameStarted && <LandingPage
        handleClick={handleClick} />}
      {gameStats.shownAnswer && (<><h1>SCore here</h1><LandingPage
        handleClick={handleClick} /></>)}
      {gameStats.gameStarted && !gameStats.shownAnswer && <QuizPage
        showScore={() => { showScore() }}
      />}
    </>
  );
}
