import React from "react"
// import CreateTask from "./Components/CreateTask/MainApp/CreateTask"
// import AllTasks from './Components/AllTasks/AllTasks'
// import Header from './Components/Header/Header'
// import AllProjects from './Pages/AllProjects/AllProjects'
// import DetailProjectPage from './Pages/DetailProject/DetailProjectPage';
import './App.css'
import '../src/assets/styles/resetStyles.scss' // reset styles
import '../src/assets/styles/colorVariables.scss'
import SettingsForm from "./Components/Settings/SettingsForm/SettingsForm"



function App() {
  return (
    <>
      <SettingsForm />
      {/* <Header isFullHeader={true}/> */}
      {/* <CreateTask /> */}
      {/* <AllTasks />
      <AllProjects/>
      <DetailProjectPage/> */}
    </>
  )
}

export default App;
