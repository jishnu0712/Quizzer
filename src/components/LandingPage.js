import React from "react";

export default function LandingPage(props) {
    return (
    <div className="LandingPage" onClick={props.handleClick}>
        <h1 className='heading'>Quizzer</h1>
        <p className='description'>Test your GK</p>
        <button className='start-quiz'>Start Quiz</button>
    </div>)
}