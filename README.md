# Primer Parcial – Sistema de Gestión de Proyectos de Software (Base)

API REST con Node.js, Express y Sequelize/MySQL.

## Instalación

1. `npm install`
2. Copiar `.env.example` a `.env` y completar los valores.
3. Crear la base de datos en MySQL (`DB_NAME`).
4. `npm run dev`

## Endpoints

_Completar el listado de endpoints._

Autenticación

Método      Ruta                 Acceso

POST        /api/auth/register   Público

POST        /api/auth/login      Público

POST        /api/auth/logout     Sesión iniciada


Proyectos

Método      Ruta                         Acceso

POST        /api/projects                Sesión iniciada

GET         /api/projects                Administrador

GET         /api/projects/my-projects    Sesión iniciada

PUT         /api/projects/:id            Líder del proyecto

DELETE      /api/projects/:id            Líder del proyecto