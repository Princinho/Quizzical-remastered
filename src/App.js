
import React from 'react';
import './App.css';
import Setup from './components/Setup';
import Splash from './components/Splash';

function App() {
  const [showSplash, setShowSplash] = React.useState(true)
  const [showSetupScreen,setShowSetupScreen]=React.useState(false)
  const [settings, setSettings] = React.useState({ questions: 5, difficulty: "easy", categories: "" })
  function hideSplash() {
    setShowSplash(false)
    setShowSetupScreen(true)
  }
  function updateSettings(name,value){
    // const { value, name } = event.target;
    setSettings(prevSettings => {
        return { ...prevSettings, [name]: value }
    })
  }
  function startGame(){
    setShowSetupScreen(false)
  }
  return (
    <div className="app">
      {showSplash && <Splash hideSplash={hideSplash} />}
      {showSetupScreen && <Setup settings={settings} startGame={startGame} updateSettings={updateSettings}/>}
    </div>
  );
}

export default App;
