import React from "react"
import logo from "../assets/logo-complete.PNG"
export default function Setup(props) {
    
    

    function handleChange(event) {
        const { value, name } = event.target;
        props.updateSettings(name,value)
    }

    return (
        <>
            {props.categories.length > 0 &&
                <div className="setup-options">
                    {!props.dataReady &&<div className="overlay"></div>}
                    <label htmlFor="questions">Number of questions</label>
                    <select id="questions" name="questions" onChange={handleChange} value={props.settings.questions}>
                        <option value={5}>5</option>
                        <option value={7}>7</option>
                        <option value={10}>10</option>
                    </select>


                    <label htmlFor="difficulty">Difficulty level</label>
                    <select id="difficulty" name="difficulty" onChange={handleChange} value={props.settings.difficulty}>
                        <option value={""}>Any difficulty</option>
                        <option value={"easy"}>Easy</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"hard"}>Hard</option>
                    </select>


                    <label htmlFor="category">Categories</label>
                    <select id="category" name="category" onChange={handleChange} value={props.settings.category}>
                        <option value="" >Any</option>
                        {props.categories.map(cat => {
                            return <option value={cat.id} key={cat.id}>{cat.name}</option>
                        })}
                    </select>
                    <button disabled={!props.dataReady} onClick={props.startGame}>Start game</button>
                </div>
            }
        </>
    )
}