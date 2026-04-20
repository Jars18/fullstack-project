require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const express = require("express");

const cors = require("cors");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});

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
app.post("/login", (req: any, res: any) => {
  const { username, password } = req.body;

  // Validación simple (puedes reemplazar con BD después)
  if (username === "admin" && password === "1234") {
    // Crear token
    const token = jwt.sign({ username: username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({
      message: "Login exitoso",
      token: token,
    });
  } else {
    return res.status(401).json({
      message: "Credenciales incorrectas",
    });
  }
});

const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "Token requerido" });
  }

  // Formato esperado: "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token inválido" });
  }

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    req.user = decoded; // opcional
    next(); // 🔥 permite continuar
  });
};

app.get("/private", verifyToken, (req: any, res: any) => {
  res.json({ message: "Acceso permitido" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
