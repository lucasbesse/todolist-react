import { faBarsProgress, faCheck, faRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, FormControlLabel, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

import "./Tasks.css";

function Tasks(props) {
  const [showCompleted, setShowCompleted] = useState(false)
  const filteredTasks = showCompleted ? props.tasks.filter((task) => !task.done) : props.tasks;
  return (
    <div className="t-container">
      <div className="check-container">
        <FormControlLabel
          control={
            <Checkbox
              className="custom-checkbox" 
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              color="primary"
            />
          }
          label="Mostrar apenas ativas"
          className="filter-checkbox"
        />
      </div>

      {filteredTasks.map((task) => (
        <div className={`task ${(task.done ? 'done' : 'not-done')}`} key={task.id}>
          <FontAwesomeIcon className="f-icon" icon={faBarsProgress} />
          <span className="task-name">{task.name}</span>
          <div className="buttons">
            <Tooltip className="custom-tooltip" classes={{ popper: "custom-tooltip finish" }} title={task.done ? "Retomar" : "Finalizar"}>
              <IconButton onClick={()=> props.onToggleTask(task)} className="i-button">
              <FontAwesomeIcon icon={task.done ? faRotateLeft : faCheck} />
              </IconButton>
            </Tooltip>

            <Tooltip classes={{ popper: "custom-tooltip delete" }} title="Excluir">
              <IconButton onClick={() => props.onDeleteTask(task.id)} className="i-button">
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
