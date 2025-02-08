import { Button } from "@mui/material";
import { useState } from "react";
import "./Form.css";

function Form(props) {
  const [task, setTask] = useState("");

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = () => {
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
