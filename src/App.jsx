import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <main>
        <Dashboard/>
      </main>
    </div>
  )
}

export default App
