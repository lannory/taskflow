
import React from "react"
import './App.css'
import '../src/assets/styles/resetStyles.scss' // reset styles
import '../src/assets/styles/colorVariables.scss'
import AllTasks from './Components/AllTasks/AllTasks'
import Header from './Components/Header/Header'
import LoginForm from "./Components/LoginForm/LoginForm"


function App() {
  return (
    <>
      <div className="MainContainer">
        <Header isFullHeader={true} />
        {/* <TaskManager /> */}
        <AllTasks />
        {/* <AllProjects/> */}
        {/* <DetailProjectPage/> */}
        <LoginForm/>
        {/* {<TeamPage/> } */}      
      </div>

    </>
  )
}

export default App;
