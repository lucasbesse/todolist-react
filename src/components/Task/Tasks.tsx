import { faBarsProgress, faCheck, faPencil, faRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Tooltip } from "@mui/material";
import { useState } from "react";
import { Task } from "./Task.interface";

import "./Tasks.css";

interface TasksProps {
  tasks: Task[];
  onToggleTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  onChangeSort: (sort: string) => void;
  lastAddedId: number;
}

function Tasks(props: TasksProps) {
  const [editMode, setEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [sortBy, setSortBy] = useState("-id");

  const handleSaveEdit = (task: Task): void => {
    setEditMode(false);
    if(!editedTaskName){
      return
    }
    task.name = editedTaskName
    setEditedTaskName('')
    props.onEditTask(task);
  }

  const handleEditMode = (task: Task): void => {
    setEditMode(true);
    setEditedTaskName(task.name)
    setEditingTaskId(task.id)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChangeSort(event.target.value)
    setSortBy(event.target.value)
  }
  
  return (
    <div className="t-container">
      {props.tasks.length > 0 && 
        <div className="check-container">
          <FormControl component="fieldset">
            <FormLabel className="field-label" component="legend">Ordenar por</FormLabel>
            <RadioGroup row value={sortBy} onChange={handleSortChange}>
              <FormControlLabel value="-id" control={<Radio color="primary" />} label="Data" />
              <FormControlLabel value="done" control={<Radio color="primary" />} label="Status" />
              <FormControlLabel value="name" control={<Radio color="primary" />} label="Nome" />
            </RadioGroup>
          </FormControl>
        </div>
      }
      {props.tasks.length === 0 && <span className="empty-list">Nenhuma tarefa adicionada.</span>}
      <div className="scroll-container">
        {props.tasks.map((task) => (
          <div className={`task ${(task.done ? 'done' : 'not-done')} ${task.id === props.lastAddedId && 'task-enter'}`} key={task.id}>
            <FontAwesomeIcon className="f-icon" icon={faBarsProgress} />
            {editMode && (editingTaskId === task.id) ? (
              <input
                type="text"
                className="input-task"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
                onBlur={() => handleSaveEdit(task)}
                onKeyUp={(e) => e.key === "Enter" && handleSaveEdit(task)}
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
    </div>
  );
}

export default Tasks;
