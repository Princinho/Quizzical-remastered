
import React from 'react';
import './App.css';
import Setup from './components/Setup';
import Splash from './components/Splash';
import Quizz from './components/Quizz';
function App() {
  const [showSplash, setShowSplash] = React.useState(true)
  const [showSetupScreen, setShowSetupScreen] = React.useState(false)
  const [gameStarted, setGameStarted] = React.useState(false)
  const [settings, setSettings] = React.useState({ questions: 5, difficulty: "easy", category: "" })
  // const [apiQuestions, setApiQuestions] = React.useState([])
  const [quizzQuestions,setQuizzQuestions]=React.useState([])
  React.useEffect(() => {
    if (gameStarted) {
      let url = `https://opentdb.com/api.php?amount=${settings.questions}${settings.category ? "&category=" + settings.category : ""}${settings.difficulty ? "&difficulty=" + settings.difficulty : ""}`.trim()
      fetch(url).then(res => res.json()).then(data => {
        // setApiQuestions(data.results)
         /*Prepare questions for render. Map into a parsedQuestion objects array
         which can hold answers in an array as objects with a marker to tell which is the right one
          */
        const parsedQuestions = data.results.map(qData => {
         const parsedQuestion = {
            question: qData.question,
            options: [...qData.incorrect_answers, qData.correct_answer]
              .map((q, index, arr) => { return { answer: q, correct: index === arr.length - 1 } })
              .sort(((a, b) => Math.random() - 0.5))
          }
          return parsedQuestion
        })
        console.log(parsedQuestions)
        setQuizzQuestions(parsedQuestions)
      })
    }
  }, [gameStarted, settings])
  function hideSplash() {
    setShowSplash(false)
    setShowSetupScreen(true)
  }
  function updateSettings(name, value) {
    // const { value, name } = event.target;
    setSettings(prevSettings => {
      return { ...prevSettings, [name]: value }
    })
  }
  function startGame() {
    setShowSetupScreen(false)
    setGameStarted(true)
  }
  
  return (
    <div className="app">
      {showSplash && <Splash hideSplash={hideSplash} />}
      {showSetupScreen && <Setup settings={settings} startGame={startGame} updateSettings={updateSettings} />}
      {(gameStarted && quizzQuestions.length>0) && <Quizz data={quizzQuestions}/>}
    </div>
  );
}

export default App;
