import { useState } from 'react'
import './App.css'

function App() {

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
