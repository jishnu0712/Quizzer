import React from "react";
import Quizz from "./Quizz";

export default function QuizPage() {
    const baseResponse = {
        A: { clicked: false },
        B: { clicked: false },
        C: { clicked: false },
        D: { clicked: false },
    };

    const [options, setOptions] = React.useState(baseResponse);

    function handleClick(id) {
        setOptions(prev => {
            return { ...baseResponse, [id]: { clicked: !prev[id].clicked } };
        });
    }
    return (
        <div className="quizz-page">
            <Quizz
                handleClick={handleClick}
                options={options}
            />
        </div>
    );
}