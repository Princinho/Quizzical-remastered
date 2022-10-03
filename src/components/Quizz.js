import React from 'react';
import { decode } from 'html-entities';
export default function Quizz(props) {
    const [questions, setQuestions] = React.useState(props.data)
    function handleClick(questionId, answerId) {
        //map through the questions, update the one that was clicked and set the selected flag to true on it's selected answer.
        console.log(questionId, answerId)
        const updatedQuestions = questions
            .map(q => q.id !== questionId ? q :
                { ...q, options: q.options.map(o => o.id !== answerId ? { ...o, selected: false } : { ...o, selected: !o.selected }) })
        console.log(updatedQuestions)
        setQuestions(updatedQuestions)
    }

    function checkAnswers(){
        
    }
    return (<div className="quizz-div">
        {questions.map(q => {
            return (
                <div className='quizz-question-wrapper' key={q.id}>
                    <p className='question'>{decode(q.question)}</p>
                    <div className='answers'>
                        {q.options.map(opt => <button key={opt.id} className={`answer ${opt.selected ? "selected" : ""}`} onClick={() => { handleClick(q.id, opt.id) }}>{decode(opt.answer)}</button>)}
                    </div>
                </div>
            )
        })}
        <button className='btn-check-answers'>Check answers</button>
    </div>)
}