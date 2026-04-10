import TaskCard from "./task_card";
import React, { useState } from "react";
import pencilIcon from "../assets/pencil-edit.svg";
import trashIcon from "../assets/trash.svg";
// @ts-ignore
import "./task_list.css";

type Task = {
  id: number;
  title: string;
  isComplete: boolean;
};

type TaskListProps = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

function TaskList({ tasks, setTasks }: TaskListProps) {
  function toggleTask(id: number) {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task,
    );

    setTasks(updated);
  }

  function deleteTask(id: number) {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={task.isComplete ? "li-task-complete" : ""}>
          <input
            type="checkbox"
            checked={task.isComplete}
            onChange={() => toggleTask(task.id)}
          />

          <span className={task.isComplete ? "task-complete" : ""}>
            {task.title}
          </span>

          <button onClick={() => deleteTask(task.id)} aria-label="Delete task">
            <img src={trashIcon} alt="" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
