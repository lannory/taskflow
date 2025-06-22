import React from "react"
// import AllTasks from './Components/AllTasks/AllTasks'
// import Header from './Components/Header/Header'
// import AllProjects from './Pages/AllProjects/AllProjects'
// import DetailProjectPage from './Pages/DetailProject/DetailProjectPage';
// import CreateTask from "./Components/CreateTask/MainApp/CreateTask"
import SettingsForm from "./Components/Settings/SettingsForm/SettingsForm"
import './App.css'
import '../src/assets/styles/resetStyles.scss' // reset styles
import '../src/assets/styles/colorVariables.scss'



function App() {
  return (
    <>
      <SettingsForm />
      {/* <CreateTask /> */}
      {/* <Header isFullHeader={true}/> */}
      {/* 
        <AllTasks />
        <AllProjects/>
        <DetailProjectPage/> 
      */}
    </>
  )
}

export default App;
