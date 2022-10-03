import React from "react"

export default function Setup(props) {
    const [categories, setCategories] = React.useState([])
    
    React.useEffect(() => {
        //recuperer les categories
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(data => setCategories(data.trivia_categories))
    }, [])

    function handleChange(event) {
        const { value, name } = event.target;
        props.updateSettings(name,value)
    }

    return (
        <>
            {categories.length > 0 &&
                <div className="setup-options">

                    <label htmlFor="questions">Number of questions</label>
                    <select id="questions" name="questions" onChange={handleChange}>
                        <option value={5}>5</option>
                        <option value={7}>7</option>
                        <option value={10}>10</option>
                    </select>


                    <label htmlFor="difficulty">Difficulty level</label>
                    <select id="difficulty" name="difficulty" onChange={handleChange}>
                        <option value={""}>Any difficulty</option>
                        <option value={"easy"}>Easy</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"hard"}>Hard</option>
                    </select>


                    <label htmlFor="category">Categories</label>
                    <select id="category" name="category" onChange={handleChange}>
                        <option value="" >Any</option>
                        {categories.map(cat => {
                            return <option value={cat.id} key={cat.id}>{cat.name}</option>
                        })}
                    </select>
                    <button onClick={props.startGame}>Start game</button>
                </div>
            }
        </>
    )
}