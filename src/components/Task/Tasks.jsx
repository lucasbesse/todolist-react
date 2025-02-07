import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@mui/material";

import "./Tasks.css";

function Tasks(props) {
  return (
    <div className="t-container">
      {props.tasks.map((task) => (
        <div className="task" key={task.id}>
          <span className="task-name">{task.name}</span>
          <div className="buttons">
            <Tooltip className="custom-tooltip" classes={{ popper: "custom-tooltip" }} title="Finalizar">
              <IconButton className="i-button">
                <FontAwesomeIcon icon={faCheck} />
              </IconButton>
            </Tooltip>

            <Tooltip className="custom-tooltip" classes={{ popper: "custom-tooltip" }} title="Excluir">
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
