require("dotenv").config();
const express = require("express");

const cors = require("cors");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// let tasks = [
//   { id: 1, title: "Study Express", isComplete: false },
//   { id: 2, title: "Build backend 2", isComplete: true },
// ];
app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});
// app.get("/tasks", (req: any, res: any) => {
//   res.json(tasks);
// });
app.get("/tasks", async (req: any, res: any) => {
  try {
    console.log("DB URL:", process.env.DATABASE_URL);
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error en GET /tasks:", error);
    res.status(500).json({ message: "Error al obtener tareas" });
  }
});
// app.post("/tasks", (req: any, res: any) => {
//   const newTask = {
//     id: req.body.id,
//     title: req.body.title,
//     isComplete: req.body.isCompleted,
//   };
//   tasks.push(newTask);
//   res.json(newTask);
// });
// app.post("/tasks", (req: any, res: any) => {
//   console.log("POST /tasks fue llamado");
//   console.log("Datos recibidos:", req.body);
//   const newTask = {
//     id: req.body.id,
//     title: req.body.title,
//     isComplete: req.body.isComplete,
//   };
//   tasks.push(newTask);
//   console.log("Lista actualizada", tasks);
//   res.json(newTask);
// });
app.post("/tasks", async (req: any, res: any) => {
  try {
    const newTask = await prisma.task.create({
      data: { title: req.body.title, isComplete: false },
    });
    res.json(newTask);
  } catch (error) {
    console.error("Error en POST /tasks:", error);
    res.status(500).json({ message: "Error al crear tarea" });
  }
});

app.put("/tasks/:id", async (req: any, res: any) => {
  try {
    const taskId = Number(req.params.id);
    const updateTask = await prisma.task.update({
      where: { id: taskId },
      data: { isComplete: req.body.isComplete },
    });
    res.json(updateTask);
  } catch (error) {
    console.error("Error en PUT /tasks/:id", error);
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
});

app.delete("/tasks/:id", async (req: any, res: any) => {
  try {
    const taskId = Number(req.params.id);
    await prisma.task.delete({
      where: { id: taskId },
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error en DELETE /tasks/:id", error);
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
});
// app.delete("/tasks/:id", (req: any, res: any) => {
//   const id = parseInt(req.params.id);

//   const taskIndex = tasks.findIndex((task) => task.id === id);

//   if (taskIndex === -1) {
//     return res.status(404).json({ message: "Tarea no encontrada" });
//   }

//   const deletedTask = tasks[taskIndex];
//   tasks.splice(taskIndex, 1);

//   res.json({
//     message: "Tarea eliminada",
//     task: deletedTask,
//   });
// });
// app.put("/tasks/:id", (req: any, res: any) => {
//   const id = parseInt(req.params.id);
//   const { isComplete } = req.body;

//   const task = tasks.find((task) => task.id === id);

//   if (!task) {
//     return res.status(404).json({ message: "Tarea no encontrada" });
//   }

//   task.isComplete = isComplete;

//   res.json({
//     message: "Estado actualizado",
//     task,
//   });
// });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
