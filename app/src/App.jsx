
import React from "react"
import './App.css'
import '../src/assets/styles/resetStyles.scss' // reset styles
import '../src/assets/styles/colorVariables.scss'
import AllTasks from './Components/AllTasks/AllTasks'
import Header from './Components/Header/Header'
import AllProjects from './Pages/AllProjects/AllProjects'
import DetailProjectPage from './Pages/DetailProject/DetailProjectPage';
import ProjectPage from "./Pages/ProjectPage";
import TeamPage from './Pages/Team/TeamPage';
import LoginForm from "./Components/LoginForm/LoginForm"
import SettingsForm from './Components/Settings/SettingsForm/SettingsForm'


function App() {
  return (
    <>
      <div className="MainContainer">
        <Header isFullHeader={false} />
        {/* <TaskManager /> */}
        {/* <AllTasks /> */}
        <AllProjects/>
        {/* <DetailProjectPage/> */}
        {/* <LoginForm/> */}
        {/* {<TeamPage/> } */}
        {/* <SettingsForm/> */}
      </div>
    </>
  )
}

export default App;
