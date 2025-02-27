import { useEffect, useState } from "react";
import FloatButton from "../FloatButton/FloatButton";
import Form from "../Form/Form";
import ProgressBar from "../ProgressBar/ProgressBar";
import { Task } from "../Task/Task.interface";
import Tasks from "../Task/Tasks";
import { getTasks } from "../Task/services/TaskService";
import "./Home.css";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [texto, setTexto] = useState("Lista de Tarefas Show de Bola");
  const [active, setActive] = useState<boolean>(false);
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

  function toggleActive(): void{
    setActive((prev)=>{
      const active = !prev
      setTexto(active ? "Whatsapp" : "Lista de Tarefas Show de Bola")
      return active
    })
  }

  function updateLastAdded(id: number): void {
    setlastAddedId(id)
  }

  function updateTasksState(tasks: Task[]): void{
    setTasks(tasks);
  }

  return (
    <div className="main-container">
      <div className="title-container">
        <img className="todo-img" src="/assets/todo-list.png" alt="Lista de tarefas" />
        <h1 className="title">{texto}</h1>
      </div>     

      <Form tasks={tasks} updateLastAdded={updateLastAdded} updateState={updateTasksState} />

      <Tasks 
        tasks={tasks} 
        lastAddedId={lastAddedId}
        onChangeSort={fetchTasks}
        updateState={updateTasksState}
      />

      <ProgressBar tasks={tasks} />
      <FloatButton toggleActive={toggleActive} active={active}></FloatButton>
    </div>
  );
}

export default Home;
