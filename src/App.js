
import React from 'react';
import './App.css';
import Setup from './components/Setup';
import Splash from './components/Splash';
import Quizz from './components/Quizz';
import { nanoid } from 'nanoid';
function App() {
  const [showSplash, setShowSplash] = React.useState(true)
  const [showSetupScreen, setShowSetupScreen] = React.useState(false)
  const [gameStarted, setGameStarted] = React.useState(false)
  const [settings, setSettings] = React.useState({ questions: 5, difficulty: "easy", category: "" })
  const [quizzQuestions, setQuizzQuestions] = React.useState([])
  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    //recuperer les categories
    console.log('fetching categories')
    fetch('https://opentdb.com/api_category.php')
        .then(res => res.json())
        .then(data => setCategories(data.trivia_categories))
}, [])

  React.useEffect(()=>{
    console.log('settings changed',settings)
    setQuizzQuestions(generateNewQuizz(settings.questions,settings.category,settings.difficulty))
  },[settings])

  // React.useEffect(() => {
  //   if (gameStarted) {
      
  //       setQuizzQuestions(generateNewQuizz(settings.questions,settings.category,settings.difficulty))
      
  //   }
  // }, [gameStarted, settings,settings.questions])

  function generateNewQuizz(questions,category,difficulty){
    console.log(settings.questions+" questions fetching")
    console.log(`fetching new questions Cat:${questions} diff ${category} count ${difficulty}`)
      let url = `https://opentdb.com/api.php?amount=${questions}${category ? "&category=" + category : ""}${difficulty ? "&difficulty=" + difficulty : ""}`.trim()
      fetch(url).then(res => res.json()).then(data => {
        // setApiQuestions(data.results)
        /*Prepare questions for render. Map into a parsedQuestion objects array
        which can hold answers in an array as objects with a marker to tell which is the right one
         */
        const parsedQuestions = data.results.map(qData => {
          const parsedQuestion = {
            id: nanoid(),
            question: qData.question,
            options: [...qData.incorrect_answers, qData.correct_answer]
              .map((q, index, arr) => { return { id:nanoid(),answer: q, correct: index === arr.length - 1,selected:false } })
              .sort(((a, b) => Math.random() - 0.5))
          }
          return parsedQuestion
        })
        console.log("fetching new questions")
        setQuizzQuestions(parsedQuestions)
      })
  }

  function hideSplash() {
    setShowSplash(false)
    setShowSetupScreen(true)
  }
  function updateSettings(name, value) {
    // const { value, name } = event.target;
    setSettings(prevSettings => {
      return { ...prevSettings, [name]: value }
    })
    console.log(settings)
  }
  function startGame() {
    setShowSetupScreen(false)
    setGameStarted(true)
  }
  function resetGame(){
    setGameStarted(false)
    setShowSetupScreen(true)
  }
  console.log(quizzQuestions)
  return (
    <div className="app">
      {showSplash && <Splash hideSplash={hideSplash} />}
      {showSetupScreen && <Setup settings={settings} startGame={startGame} dataReady={quizzQuestions?true:false} categories={categories} updateSettings={updateSettings} />}
      {(gameStarted && quizzQuestions.length > 0) && <Quizz data={quizzQuestions} resetGame={resetGame} />}
    </div>
  );
}

export default App;
