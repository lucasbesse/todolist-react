import { useEffect, useState } from "react";
import "./App.css";
import todoListImg from "./assets/todo-list.png";
import Form from "./components/Form/Form";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import { addTask, deleteTask, getTasks, updateTask } from './components/Task/services/TaskService';
import Tasks from "./components/Task/Tasks";

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
        <img className="todo-img" src={todoListImg} alt="" />
        <h1 className="title">Lista de tarefas show de bola</h1>
      </div>     
      <Form onAddTask={handleAddTask} />
      <Tasks tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} onEditTask={handleEditTask} />
      {tasks.length > 0 && <ProgressBar tasks={tasks}></ProgressBar>}
    </div>
  );
}

export default App;
