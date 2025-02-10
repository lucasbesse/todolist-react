import { Task } from "../Task/Task.interface";
import "./ProgressBar.css";

interface ProgressBarProps {
  tasks: Task[];
}

function ProgressBar(props: ProgressBarProps){

  const getProgress = (): number => {
    if(props.tasks.length === 0){
      return 0
    }
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
