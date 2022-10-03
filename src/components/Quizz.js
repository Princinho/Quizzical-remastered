export default function Quizz(props) {
    return (<div className="quizz-div">
        {props.data.map(q => {
            return (
                <div>
                    <p>{q.question}</p>
                    <div>
                        {q.options.map(opt=><button>{opt.answer}</button>)}
                    </div>
                </div>)
        })}
    </div>)
}