import { faBarsProgress, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@mui/material";

import "./Tasks.css";

function Tasks(props) {
  return (
    <div className="t-container">
      {props.tasks.map((task) => (
        <div className="task" key={task.id}>
          <FontAwesomeIcon className="f-icon" icon={faBarsProgress} />
          <span className="task-name">{task.name}</span>
          <div className="buttons">
            <Tooltip className="custom-tooltip" classes={{ popper: "custom-tooltip finish" }} title="Finalizar">
              <IconButton className="i-button">
                <FontAwesomeIcon icon={faCheck} />
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
