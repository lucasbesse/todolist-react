import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Task } from "../Task/Task.interface";
import "./Form.css";

interface FormProps {
  onAddTask: (task: Task) => void;
}

function Form(props: FormProps) {
  const [task, setTask] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleSubmit = (): void => {
    if (!task) return;
    let formattedTask = {
      name: task,
      done: false 
    }
    props.onAddTask(formattedTask);
    setTask("");
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
