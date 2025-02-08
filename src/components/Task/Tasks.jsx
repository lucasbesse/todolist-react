import { faBarsProgress, faCheck, faPencil, faRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, FormControlLabel, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

import "./Tasks.css";

function Tasks(props) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const filteredTasks = showCompleted ? props.tasks.filter((task) => !task.done) : props.tasks;

  const handleSaveEdit = (task)=>{
    setEditMode(false);
    if(!editedTaskName){
      return
    }
    task.name = editedTaskName
    setEditedTaskName('')
    props.onEditTask(task);
  }

  const handleEditMode = (task)=>{
    setEditMode(true);
    setEditedTaskName(task.name)
    setEditingTaskId(task.id)
  }
  
  return (
    <div className="t-container">
      {props.tasks.length > 0 && 
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
      }
      {filteredTasks.length === 0 && <span className="empty-list">Nenhuma tarefa adicionada.</span>}
      {filteredTasks.map((task) => (
        <div className={`task ${(task.done ? 'done' : 'not-done')}`} key={task.id}>
          <FontAwesomeIcon className="f-icon" icon={faBarsProgress} />
          {editMode && (editingTaskId === task.id) ? (
            <input
              type="text"
              className="input-task"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
              onBlur={() => handleSaveEdit(task)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(task)}
              autoFocus
            />
          ) : (
            <span className="task-name">{task.name}</span>
          )}
          {(!editMode || task.id !== editingTaskId) &&
            <div className="buttons">
            <Tooltip className="custom-tooltip" classes={{ popper: "custom-tooltip finish" }} title={task.done ? "Retomar" : "Finalizar"}>
              <IconButton onClick={()=> props.onToggleTask(task)} className="i-button check-btn">
              <FontAwesomeIcon icon={task.done ? faRotateLeft : faCheck} />
              </IconButton>
            </Tooltip>

            <Tooltip classes={{ popper: "custom-tooltip" }} title="Editar">
              <IconButton onClick={() => handleEditMode(task)} className="i-button">
                <FontAwesomeIcon icon={faPencil} />
              </IconButton>
            </Tooltip>

            <Tooltip classes={{ popper: "custom-tooltip delete" }} title="Excluir">
              <IconButton onClick={() => props.onDeleteTask(task.id)} className="i-button">
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </Tooltip>
          </div>}
        </div>
      ))}
    </div>
  );
}

export default Tasks;
