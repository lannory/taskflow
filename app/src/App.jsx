
import React from "react";
import './App.css';
import '../src/assets/styles/resetStyles.scss'; // reset styles
import '../src/assets/styles/colorVariables.scss';
import AllTasks from './Components/AllTasks/AllTasks';
import Header from './Components/Header/Header';
import AllProjects from './Pages/AllProjects/AllProjects';
import DetailProjectPage from './Pages/DetailProject/DetailProjectPage';
import ProjectPage from "./Pages/ProjectPage";
import TeamPage from './Pages/Team/TeamPage';
import LoginForm from "./Components/LoginForm/LoginForm";
import CreateTask from './Components/CreateTask/MainApp/CreateTask';
import ProjectsList from "./Components/allprojects/ProjectsList/ProjectsList";
import ProjectsNavigation from "./Components/allprojects/ProjectsNavigation/ProjectsNavigation";

function App() {
  return (
    <>
      <div className="MainContainer">
        {/* <Header isFullHeader={true} /> */}
        {/* <CreateTask/> */}
        {/* <AllTasks /> */}
        {/* <LoginForm/> */}



        {<TeamPage/> }
        {/* <AllProjects /> */}
        {/* <DetailProjectPage/> */}
      </div>
    </>
  )
}

export default App;
