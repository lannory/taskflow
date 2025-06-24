
import React from "react";
import './App.css';
import '../src/assets/styles/resetStyles.scss'; // reset styles
import '../src/assets/styles/colorVariables.scss';
import AllTasks from './Pages/AllTasks/AllTasks';
import Header from './Components/Header/Header';
import AllProjects from './Pages/AllProjects/AllProjects';
import DetailProjectPage from './Pages/DetailProject/DetailProjectPage';
import ProjectPage from "./Pages/ProjectCreatePage/ProjectPage";
import TeamPage from './Pages/Team/TeamPage';
import LoginForm from "./Pages/LoginForm/LoginForm";
import CreateTask from './Pages/CreateTask/CreateTask';
import SettingsForm from './Pages/SettingsForm/SettingsForm';

function App() {
  return (
    <>
      <div className="MainContainer">
        {/* <Header isFullHeader={true} /> */}


        <SettingsForm/>
        {/* <CreateTask/> */}
        {/* <AllTasks /> */}
        {/* <ProjectPage /> */}
        {/* {<TeamPage/> } */}
        {/* <AllProjects /> */}
        {/* <DetailProjectPage/> */}


        {/* <LoginForm/> */}
      </div>
    </>
  )
}

export default App;
