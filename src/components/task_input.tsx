import { useState } from "react";
// @ts-ignore
import "./task_input.css";

type Task = {
  id: number;
  title: string;
  isComplete: boolean;
};

interface TaskInputProps {
  addTask: (title: string) => void;
}

function TaskInput({ addTask }: TaskInputProps) {
  const [newTask, setNewTask] = useState("");

  function handleAddTask() {
    if (!newTask.trim()) return;

    addTask(newTask);
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
