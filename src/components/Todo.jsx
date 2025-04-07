import React from 'react'
import '../css/Todo.css'

export default function Todo() {

  const handleTaskClick = (e) => {
    console.log("clicked")
    e.target.remove();
  }

  const addTask = (e) => {
    var ul = document.getElementsByClassName('todo-list');
    var li = document.createElement("li");
    li.appendCHild(e.target.value);
    ul.appendChild(li);
  }

  return (
    <div className="todo">
      {/*TODO: 
      Be able to add tasks 
      Be able to mark tasks as done which removes them from the list
      ----------------  MVP  -------------
      Store complted tasks
      Be able to delete tasks rather than mark them complete*/}
      <label htmlFor='task-input'>Enter Task</label>
      <form className="task-input" 
      type='text'
      onChange={(e) => addTask(e.target.value)}
      hidden
      />
      <ul className="todo-list">
        <li className="task" onClick={(e) => handleTaskClick(e)}>1</li>
        <li className="task" onClick={handleTaskClick}>2</li>
        <li className="task" onClick={handleTaskClick}>3</li>
        <li className="task" onClick={handleTaskClick}>4</li>
      </ul>
    </div>
  )
}
