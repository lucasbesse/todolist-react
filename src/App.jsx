import { useEffect, useState } from "react";
import "./App.css";
import todoListImg from "./assets/todo-list.png";
import Form from "./components/Form/Form";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import { addTask, deleteTask, getTasks, updateTask } from "./components/Task/services/TaskService";
import Tasks from "./components/Task/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => { 
    fetchTasks();
  }, []);

  async function fetchTasks(){
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  async function handleAddTask(task){
    try {
      const newTask = { name: task.name, done: task.done };
      const data = await addTask(newTask);
      if (data) {
        setTasks(prevTasks => [data, ...prevTasks ]);
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  async function handleDeleteTask(taskId){
    try {
      const result = await deleteTask(taskId);
      if (result) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  async function handleToggleTask(task){
    try {
      const updatedTask = { ...task, done: !task.done };
      const result = await updateTask(updatedTask);
      if (result) {
        setTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? updatedTask : t)));
      }
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
    }
  };

  async function handleEditTask(task){
    try {
      const result = await updateTask(task);
      if (result) {
        setTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? task : t)));
      }
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="title-container">
        <img className="todo-img" src={todoListImg} alt="Lista de tarefas" />
        <h1 className="title">Lista de tarefas show de bola</h1>
      </div>     

      <Form onAddTask={handleAddTask} />

      <Tasks 
        tasks={tasks} 
        onDeleteTask={handleDeleteTask} 
        onToggleTask={handleToggleTask} 
        onEditTask={handleEditTask} 
      />

      {tasks.length > 0 && <ProgressBar tasks={tasks} />}
    </div>
  );
}

export default App;
