# FullStack Project - ToDo
 
La aplicación web ayuda con la gestion de una lista de que haceres, ofreciendo el guardado en una base de datos.
 
[![CI](https://github.com/Jars18/fullstack-project/actions/workflows/ci.yml/badge.svg)](https://github.com/Jars18/fullstack-project/actions/workflows/ci.yml)
 
## 🚀 Instalación local
 
```bash
git clone https://github.com/Jars18/fullstack-project.git
cd fullstack-project
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):
 
 Dentro de /src
```
VITE_API_URL=
```
 Dentro de /backend
```
JWT_SECRET_KEY=
DATABASE_URL=
``` 
## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas|
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).
