import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import { PomodoroProvider } from './components/contexts/PomodoroContext';
import { TodoProvider } from './components/contexts/TodoContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TodoProvider>
        <PomodoroProvider>
          <Dashboard/>
        </PomodoroProvider>
      </TodoProvider>
      
      <div className="background">
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
      </div>
    </div>
  )
}

export default App
