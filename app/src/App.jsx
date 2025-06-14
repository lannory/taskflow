
import TaskManager from "./Components/TaskManager/MainApp/TaskManager"
import './App.css'
import AllTasks from './Components/AllTasks/AllTasks'
import Header from './Components/Header/Header'

function App() {
  return (
    <>
    {/* <Header isFullHeader={false}/> */}
      <TaskManager />
      <AllTasks />
    </>
  )
}

export default App
