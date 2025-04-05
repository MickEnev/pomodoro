import React from 'react'
import '../css/Todo.css'

export default function Todo() {
  return (
    <div className="todo">
      {/*TODO: 
      Be able to add tasks 
      Be able to mark tasks as done which removes them from the list
      ----------------  MVP  -------------
      Store complted tasks
      Be able to delete tasks rather than mark them complete*/}
      <ul className="todo-list">
        <li className="task">BallsBalls</li>
        <li className="task">Balls</li>
        <li className="task">Balls</li>
        <li className="task">Balls</li>
      </ul>
    </div>
  )
}
