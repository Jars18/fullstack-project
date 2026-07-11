type Task = {
  id: number;
  title: string;
  isComplete: boolean;
};

export const countCompletedTasks = (tasks: Task[]): number => {
  return tasks.reduce((acc, task) => {
    return task.isComplete ? acc + 1 : acc;
  }, 0);
};