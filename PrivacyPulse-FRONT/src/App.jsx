import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <>
      <p className="read-the-docs">
        This is the home page.
      </p>
      <p onClick={() => navigate("/header")}>
        Header
      </p>
      <p onClick={() => navigate("/login")}>
        Login
      </p>
    </>
  )
}

export default App
