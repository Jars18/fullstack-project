import { useState } from "react";
// @ts-ignore
import "./task_input.css";

type Task = {
  id: number;
  title: string;
  isComplete: boolean;
};

interface TaskInputProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

function TaskInput({ tasks, setTasks }: TaskInputProps) {
  const [newTask, setNewTask] = useState("");

  function handleAddTask() {
    if (!newTask.trim()) return;

    const newTaskObject: Task = {
      id: Date.now(),
      title: newTask,
      isComplete: false,
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask("");
  }

  return (
    <>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button onClick={handleAddTask} className="add-button">
        Añade una nueva tarea
      </button>
    </>
  );
}

export default TaskInput;
