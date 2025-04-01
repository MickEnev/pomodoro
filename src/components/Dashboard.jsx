import {React, useState} from 'react'
import Pomodoro from './Pomodoro.jsx'
import Todo from './Todo.jsx'
import styles from '../css/dashboard.module.css'
import Options from './Options'

export default function Dashboard() {
  const [selection, setSelection] = useState("Pomodoro")

  const dataRender = {
    'Pomodoro' : <Pomodoro/>,
    'Todo': <Todo/>
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.layout}>
        <h1 style={{margin: '0 auto', color: '#ffffff'}}> Pomodoro Timer</h1>
        <Options selection={selection} setSelection={setSelection}/>
        <div className={styles.content}>{dataRender[selection]}</div>
      </div>
    </div>
  )
}
