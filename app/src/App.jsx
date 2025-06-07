import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import './reset.scss';
import AllProjects from './Pages/AllProjects'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AllProjects/>
    </>
  )
}

export default App
