import TaskCard from "./task_card";
import React, { useState } from "react";
// @ts-ignore
import trashIcon from "../assets/trash.svg";
// @ts-ignore
import "./task_list.css";
import { api } from "../api";

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
  function toggleTask(id: number, currentState: boolean) {
    fetch(api(`/tasks/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isComplete: !currentState }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updated = tasks.map((task) => (task.id === id ? data : task));
        setTasks(updated);
      })
      .catch((error) => {
        console.error("Error al actualizar tarea:", error);
      });
  }

  function deleteTask(id: number) {
    fetch(api(`/tasks/${id}`), {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updated = tasks.filter((task) => task.id !== id);
        setTasks(updated);
      })
      .catch((error) => {
        console.error("Error al eliminar tarea:", error);
      });
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={task.isComplete ? "li-task-complete" : ""}>
          <input
            type="checkbox"
            checked={task.isComplete ?? false}
            onChange={() => toggleTask(task.id, task.isComplete)}
          />

          <span className={task.isComplete ? "task-complete" : ""}>
            {task.title}
          </span>

          <button onClick={() => deleteTask(task.id)}>
            <img src={trashIcon} alt="" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
