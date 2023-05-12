import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="read-the-docs">
        This is the home page
      </p>
      <p 
        onClick={() => (window.location.href = `/header`)}
      >
        header
      </p>
    </>
  )
}

export default App
