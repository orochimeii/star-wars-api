# 🌌 Star Wars API Challenge

Esta API consume datos de la [API pública de Star Wars (SWAPI)](https://www.swapi.tech/api/people), los guarda en una base de datos PostgreSQL y permite exportarlos a CSV.

## 🚀 Tecnologías utilizadas

-   **Node.js**
-   **Express**
-   **PostgreSQL**
-   **Sequelize (ORM)**
-   **Docker + Docker Compose**

## 📁 Estructura del proyecto

    /challenge
    ├── src
    │ ├── config
    │ │ ├── sequelize.js # Conexión a la base de datos
    │ │ └── init.sql # Inicialización de usuario y base de datos
    │ ├── controllers
    │ │ └── dataController.js # Lógica de los endpoints
    │ ├── models
    │ │ └── dataModel.js # Definición del modelo de datos
    │ ├── routes
    │ │ └── api.js # Definición de rutas
    │ ├──services
    │ │ └── externalAPI.js # Consumo de la API externa
    ├── tests # Definicion de tests automaticos
    │ ├── integration
    │ │ └── api.test.js
    │ ├── unit
    │ │ ├── controllers.test.js
    │ │ └── externalAPI.test.js
    ├── server.js # Configuración del servidor Express
    ├── constants.js # Variables compartidas
    ├── .env # Variables de entorno
    ├── package.json # Dependencias del proyecto
    ├── Dockerfile # Imagen para la API
    ├── docker-compose.yml # Orquestación de servicios
    └── README.md

## 📦 Dependencias principales

-   `axios` – Para consumir la API externa
-   `dotenv` – Para manejar variables de entorno
-   `express` – Framework web
-   `json2csv` – Para generar archivos CSV
-   `pg` – Cliente PostgreSQL
-   `sequelize` y `sequelize-cli` – ORM y utilidades

---

## 📦 Dependencias de desarrollo

-   `jest` – Framework de testing
-   `supertest` – Para definir los tests

---

## 📡 Endpoints

| Método | Ruta                 | Descripción                                                           |
| ------ | -------------------- | --------------------------------------------------------------------- |
| POST   | `/api/external-data` | Consume 10 personajes de SWAPI y los guarda en la base de datos       |
| GET    | `/api/data`          | Retorna todos los personajes guardados en la base de datos            |
| GET    | `/api/export-csv`    | Obtiene detalles ampliados y genera el archivo `data.csv` descargable |

---

## 🐳 Cómo ejecutar con Docker y Docker Compose

### 1. Cloná el repositorio

```bash
git clone https://github.com/orochimeii/star-wars-api.git
cd star-wars-api
```

### 2. Construccion y arranque

```bash
docker compose up --build -d
```

### 3. Probá los endpoints

-   Una vez el servidor esté corriendo:

-   POST http://localhost:3000/api/external-data
-   → Guarda 10 personajes desde SWAPI

-   GET http://localhost:3000/api/data
-   → Lista los personajes guardados

-   GET http://localhost:3000/api/export-csv
-   → Descarga el archivo data.csv con más detalles

## 🧪 Testing con Jest

-   Este proyecto incluye pruebas automatizadas utilizando **Jest** y **Supertest**.

### Como ejecutar los test

```bash
docker compose exec api npm test
```

## 📄 Licencia

-   Este proyecto es de uso libre con fines educativos y prácticos.
