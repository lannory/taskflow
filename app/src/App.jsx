
import TaskManager from "./Components/TaskManager/MainApp/TaskManager"
import './App.css'
import '../src/assets/styles/resetStyles.scss' // reset styles
import '../src/assets/styles/colorVariables.scss'
import AllTasks from './Components/AllTasks/AllTasks'
import Header from './Components/Header/Header'
import React from "react"


function App() {
  return (
    <>
    <Header isFullHeader={true}/>
      <TaskManager />
      <AllTasks />
    </>
  )
}

export default App
