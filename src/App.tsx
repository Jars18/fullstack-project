import Header from "./components/headers";
import TaskList from "./components/task_list";
import Footer from "./components/footer";
import TaskInput from "./components/task_input";
// import { tasks as inititalTasks } from "./components/empty_state";
import { useEffect, useState } from "react";
function App() {
  type Task = {
    id: number;
    title: string;
    isComplete: boolean;
  };
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  }, []);

  const addTask = (taskText: string) => {
    const newTask = {
      id: Date.now(),
      title: taskText,
      isComplete: false,
    };

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tarea creada en backend:", data);
        setTasks([...tasks, data]);
      })
      .catch((error) => {
        console.error("Error al crear tarea:", error);
      });
  };

  const tasksCompleted = tasks.reduce((acc, task) => {
    return task.isComplete ? acc + 1 : acc;
  }, 0);

  return (
    <div>
      <Header />
      <TaskInput addTask={addTask} />
      <TaskList setTasks={setTasks} tasks={tasks} />
      <Footer
        tasksCounter={tasks.length}
        tasksCompleteCounter={tasksCompleted}
      />
    </div>
  );
}

export default App;
