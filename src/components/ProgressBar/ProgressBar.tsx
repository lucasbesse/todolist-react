import "./ProgressBar.css";

const ProgressBar = (props) => {

  const getProgress = (): number => {
    const completedTasks = props.tasks.filter(task => task.done).length;
    let result = ((completedTasks / props.tasks.length) * 100).toFixed(0);
    return parseInt(result);
  };

  return (
    <div className="progress-bar-container">
      <span className="label">Progresso das tarefas ({getProgress()}%)</span>
      <div className={`progress-bar-border ${getProgress() === 0 && 'no-value'}`}>
        <div className={`progress-bar ${getProgress() < 100 && 'flat-border'}`} style={{ width: `${getProgress()}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
