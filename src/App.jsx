import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Tasks from "./components/Task/Tasks";
import { addTask, deleteTask, getTasks, updateTask } from './components/Task/TaskService';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => { 
    fetchTasks();
  }, []);

  async function fetchTasks(){
    const data = await getTasks();
    setTasks(data)
  };

  async function handleAddTask(task){
    const newTask = { name: task.name, done: task.done  };

    const data = await addTask(newTask)
    if(data){
      fetchTasks();
    }
  };

  async function handleDeleteTask(taskId){
    const result = await deleteTask(taskId)
    if(result){
      fetchTasks();
    }
  };

  async function handleToggleTask(task){
    task.done = !task.done
    const result = await updateTask(task)
    if(result){
      fetchTasks();
    }
  };

  async function handleEditTask(task){
    const result = await updateTask(task)
    if(result){
      fetchTasks();
    }
  };

  return (
    <div className="main-container">
      <div className="title-container">
        <FontAwesomeIcon className="f-icon" icon={faListCheck} />
        <h1 className="title">Lista de tarefas show de bola</h1>
      </div>     
      <Form onAddTask={handleAddTask} />
      <Tasks tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} onEditTask={handleEditTask} />
    </div>
  );
}

export default App;
