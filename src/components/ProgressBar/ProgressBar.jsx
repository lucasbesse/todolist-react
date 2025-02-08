import React from "react";
import "./ProgressBar.css";

const ProgressBar = (props) => {

  const getProgress = () => {
    const completedTasks = props.tasks.filter(task => task.done).length;
    return ((completedTasks / props.tasks.length) * 100).toFixed(0);
  };

  return (
    <div className="progress-bar-container">
      <span className="label">Progresso das tarefas ({getProgress()}%)</span>
      <div className="progress-bar-border">
        <div className="progress-bar" style={{ width: `${getProgress()}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
