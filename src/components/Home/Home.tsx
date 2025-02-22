import { useEffect, useState } from "react";
import Form from "../Form/Form";
import ProgressBar from "../ProgressBar/ProgressBar";
import { addTask, deleteTask, getTasks, updateTask } from "../Task/services/TaskService";
import { Task } from "../Task/Task.interface";
import Tasks from "../Task/Tasks";
import "./Home.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [lastAddedId, setlastAddedId] = useState(null);

  useEffect(() => { 
    fetchTasks();
  }, []);

  async function fetchTasks(sort?: string): Promise<void>{
    try {
      const data = await getTasks(sort);
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  async function handleAddTask(task: Task): Promise<void>{
    try {
      const newTask = { name: task.name, done: task.done };
      const data = await addTask(newTask);
      if (data) {
        setlastAddedId(data.id)
        setTasks(prevTasks => [data, ...prevTasks ]);
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  async function handleDeleteTask(taskId: number): Promise<void>{
    try {
      const result = await deleteTask(taskId);
      if (result) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  async function handleToggleTask(task: Task): Promise<void>{
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

  async function handleEditTask(task: Task): Promise<void>{
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
        <img className="todo-img" src="/assets/todo-list.png" alt="Lista de tarefas" />
        <h1 className="title">Lista de Tarefas Show de Bola</h1>
      </div>     

      <Form onAddTask={handleAddTask} />

      <Tasks 
        tasks={tasks} 
        onDeleteTask={handleDeleteTask} 
        onToggleTask={handleToggleTask} 
        onEditTask={handleEditTask} 
        onChangeSort={fetchTasks}
        lastAddedId={lastAddedId}
      />

      <ProgressBar tasks={tasks} />
    </div>
  );
}

export default Home;
