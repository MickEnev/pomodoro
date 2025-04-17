import React, { useState, useContext } from 'react'
import TodoContext from './contexts/TodoContext'
import '../css/Todo.css'

export default function Todo() {
    const {
      task,
      setTask,
      taskList,
      handleKeyEnter,
      handleTaskClick,
    } = useContext(TodoContext);

  return (
    <div className="todo">
      {/*TODO: 
      Have tasks persist between screens
      Be able to mark tasks as done which removes them from the list
      ----------------  MVP  -------------
      Store complted tasks
      Be able to delete tasks rather than mark them complete*/}
      <label htmlFor='task-input'>Enter Task</label>
      <input 
      className="task-input" 
      type='text'
      value = {task}
      onChange={(e) => setTask(e.target.value)}
      onKeyDown={handleKeyEnter}
      placeholder="Add Task"
      />
      <ul className="todo-list">
        {taskList.map((item, index) => (
          <li
            key={index}
            className="task"
            onClick={() => handleTaskClick(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
