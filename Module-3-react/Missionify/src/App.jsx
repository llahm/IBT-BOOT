import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>
        welcome to the first react app, this is the missionify app
      </h1>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
      <button
        type="button"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>
    </>
  )
}

export default App
