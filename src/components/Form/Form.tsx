import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Task } from "../Task/Task.interface";
import { addTask } from "../Task/services/TaskService";
import "./Form.css";

interface FormProps {
  updateState: (tasks: Task[]) => void;
  updateLastAdded: (id: number) => void;
  tasks: Task[];
}

function Form(props: FormProps) {
  const [task, setTask] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleSubmit = (): void => {
    if (!task) return;
    let formattedTask: Task = {
      name: task,
      done: false 
    }
    handleAddTask(formattedTask);
    setTask("");
  };

  
  async function handleAddTask(task: Task): Promise<void>{
    try {
      const data = await addTask(task);
      if (data) {
        props.updateLastAdded(data.id)
        const newTasks = [data, ...props.tasks]
        props.updateState(newTasks);
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  return (
    <div className="f-container">
      <span className="form-title">Adicionar Tarefa</span>
      <div className="action">
        <input
          type="text"
          className="input-task"
          value={task}
          onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} className="add-btn">
          Adicionar
        </Button>
      </div>
    </div>
  );
}

export default Form;
