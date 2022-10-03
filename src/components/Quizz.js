import {decode} from 'html-entities';
export default function Quizz(props) {
    const [questions,setQuestions]=React.useState(props.data)
    return (<div className="quizz-div">
        {questions(q => {
            return (
                <div className='quizz-question-wrapper'>
                    <p className='question'>{decode(q.question)}</p>
                    <div className='answers'>
                        {q.options.map(opt=><button>{decode(opt.answer)}</button>)}
                    </div>
                </div>)
        })}
    </div>)
}