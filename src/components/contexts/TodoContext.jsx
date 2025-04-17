import { createContext, useState, useContext, useEffect, useRef, use } from 'react'

const TodoContext = createContext()

export const useTodoContext= () => useContext(TodoContext)

export const TodoProvider = ({children}) => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    const handleTaskClick = (index) => {
        const newList = [...taskList];
        newList.splice(index, 1);
        setTaskList(newList);
      };

    const handleKeyEnter = (event) => {
        if (event.key === "Enter") {
        event.preventDefault();
        addTask();
        }
    };

    const addTask = () => {
        if (task.trim() === "") return;
        setTaskList([...taskList, task]);
        setTask("");
      };

  return (
    <TodoContext.Provider
      value={{
        task,
        setTask,
        taskList,
        setTaskList,
        handleKeyEnter,
        handleTaskClick,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;