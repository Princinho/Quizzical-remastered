export default function Splash(props) {
    return (
        <div className="splash">
            <h1>Quizzical</h1>
            <p className="game-description">
                Test your general knowledge
            </p>
            <button onClick={props.hideSplash}>Setup game</button>
        </div>)
}