
import React from "react";
import styles from './App.module.scss';
import '../src/assets/styles/resetStyles.scss'; // reset styles
import '../src/assets/styles/colorVariables.scss';
import AllTasks from './Pages/AllTasks/AllTasks';
import Header from './Components/Header/Header';
import AllProjects from './Pages/AllProjects/AllProjects';
import DetailProjectPage from './Pages/DetailProject/DetailProjectPage';
import CreateProject from "./Pages/ProjectCreatePage/CreateProject";
import TeamPage from './Pages/Team/TeamPage';
import LoginForm from "./Pages/LoginForm/LoginForm";
import CreateTask from './Pages/CreateTask/CreateTask';
import SettingsForm from './Pages/SettingsForm/SettingsForm';
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from './Pages/Overview/Overview';

function App() {
  return (
    <div className={styles.AppWrapper}>
      <Sidebar />
      <div className={styles.MainContainer}>
        <Header isFullHeader={true} />

        <div className={styles.pages}>
          {/* <LoginForm/> */}

          {/* <Overview/> */}

          {/* <AllTasks /> */}
          {/* <CreateTask/> */}

          <AllProjects /> 
          {/* <CreateProject /> */}
          {/* <DetailProjectPage/>  */}

          {/* <TeamPage/>  */}

          {/* <SettingsForm/> */}
        </div>
      </div>
    </div>
  )
}

export default App;
