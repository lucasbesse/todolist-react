import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Tasks from "./components/Task/Tasks";
import { addTask, deleteTask, getTasks } from './components/Task/TaskService';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => { 
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    //setTasks(data)
    setTasks([
      { id: 1, name: "Estudar React" },
      { id: 2, name: "Criar um projeto em Material UI" },
      { id: 3, name: "Refatorar código do To-Do List" },
      { id: 4, name: "Testar funcionalidades do Tooltip" },
      { id: 5, name: "Melhorar a performance da aplicação" }
    ])
  };


  async function handleAddTask(task){
    const newTask = { name: task.name, done: task.done  };

    const data = await addTask(newTask)
    if(data){
      fetchTasks();
    }
  };

  // Excluir uma tarefa
  const handleDeleteTask = async (taskId) => {

    const result = await deleteTask(taskId)
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
      <Tasks tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;
