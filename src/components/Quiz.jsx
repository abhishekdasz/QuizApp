import React, { useState } from 'react'
import { QuizData } from '../constants/QuizData';

const Quiz = () => {
    const [currQueIndex, setCurrQueIndex] = useState(0);
    const currentQue = QuizData[currQueIndex];
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleOptionChange = (optIndex) =>{
        setSelectedOptionIndex(optIndex);
    }
    const handleNextQue = () => {
        if(selectedOptionIndex!==null)
        {
            const selectOption = currentQue.options[selectedOptionIndex];
            if(selectOption.isCorrect)
            {
                setScore(score+1);
            }
            if(currQueIndex < QuizData.length-1)
            {
                setCurrQueIndex(currQueIndex+1);
                setSelectedOptionIndex(null);
            }
        }
    }
    const handleSubmitQuiz = () =>{
        if(selectedOptionIndex !== null)
        {
            const selectOption = currentQue.options[selectedOptionIndex];
            if(selectOption.isCorrect)
            {
                setScore(score+1);
            } 
        }
        setSubmitted(true);
    }

    if(submitted)
    {
        return(
            <div className='quiz-sec'>
                <p> Final Score: {score} </p>
            </div>
        )
    }


    
  return (
    <div className='quiz-sec'>
        <div className="quiz-container">
            <h3> {currentQue.question} </h3>
            {
                currentQue.options.map((opt, index)=>(
                    <label>
                        <input 
                            type="radio"
                            name='answer'
                            value={opt.id}
                            checked={index === selectedOptionIndex} 
                            onChange={()=>handleOptionChange(index)}
                        />
                        {opt.label}
                    </label>
                ))
            }
            {
                currQueIndex < QuizData.length-1 ? 
                ( <button onClick={handleNextQue}> Next </button> ) :
                ( <button onClick={handleSubmitQuiz}> Submit </button> )
            }
            
        </div>
    </div>
  )
}

export default Quiz;
