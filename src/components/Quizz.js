import React from 'react';
import { decode } from 'html-entities';
export default function Quizz(props) {
    const [questions, setQuestions] = React.useState(props.data)
    const [submitted, setSubmitted] = React.useState(false)
    const [score,setScore]=React.useState(0)
    function handleClick(questionId, answerId) {
        //If answers are not submitted yet
        if (!submitted) {
            //map through the questions, update the one that was clicked and set the selected flag to true on it's selected answer.
            const updatedQuestions = questions
                .map(q => q.id !== questionId ? q :
                    { ...q, options: q.options.map(o => o.id !== answerId ? { ...o, selected: false } : { ...o, selected: !o.selected }) })
            setQuestions(updatedQuestions)
            

        } 
    }

    function checkAnswers() {
        setSubmitted(true)
    }
    return (<div className="quizz-div">
        <h1 className='quizz-instructions'>Select the right answers</h1>
        {questions.map(q => {
            return (
                <div className='quizz-question-wrapper' key={q.id}>
                    <p className='question'>{decode(q.question)}</p>
                    <div className='answers'>
                        {q.options.map(opt =>
                            <button key={opt.id}
                                className={`answer ${opt.selected ? " selected" : " "}
                                ${submitted ? opt.selected ? " selected" : " ignored":""}
                                 ${submitted && opt.correct ? " correct" : ""}
                                 ${submitted && opt.selected && !opt.correct ? " error" : ""}
                                 `}
                                onClick={() => { handleClick(q.id, opt.id) }}>
                                {decode(opt.answer)}
                            </button>)}
                    </div>
                </div>
            )
        })}
        {submitted ? <button className='btn-check-answers' onClick={props.resetGame}>New Game</button> :
            <button className='btn-check-answers' onClick={checkAnswers}>Check answers</button>
        }
        {submitted && <p>{questions.reduce((prevScore,currentQuestion)=>{
            return currentQuestion.options.some(opt=>opt.correct && opt.selected)?prevScore+1:prevScore
        },0)}</p>}
        

    </div>)
}