import {decode} from 'html-entities';
export default function Quizz(props) {
    return (<div className="quizz-div">
        {props.data.map(q => {
            return (
                <div>
                    <p>{decode(q.question)}</p>
                    <div>
                        {q.options.map(opt=><button>{decode(opt.answer)}</button>)}
                    </div>
                </div>)
        })}
    </div>)
}