import Header from "./components/headers";
import TaskList from "./components/task_list";
import Footer from "./components/footer";
import TaskInput from "./components/task_input";
import { tasks as inititalTasks } from "./components/empty_state";
import { useState } from "react";
function App() {
  const [tasks, setTasks] = useState(inititalTasks);
  const tasksCompleted = tasks.reduce((acc, task) => {
    return task.isComplete ? acc + 1 : acc;
  }, 0);

  return (
    <div>
      <Header />
      <TaskInput setTasks={setTasks} tasks={tasks} />
      <TaskList setTasks={setTasks} tasks={tasks} />
      <Footer
        tasksCounter={tasks.length}
        tasksCompleteCounter={tasksCompleted}
      />
    </div>
  );
}

export default App;
