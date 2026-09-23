# MiniBlog API

API REST desarrollada en Node.js + Express, conectada a PostgreSQL, para gestionar autores (`authors`) y publicaciones (`posts`) de un blog. Proyecto de práctica enfocado en conexión Express–Postgres, operaciones CRUD, validación, testing y despliegue.

---

## 📋 Descripción del proyecto

La API expone endpoints CRUD para dos entidades relacionadas:

- **authors**: `id`, `name`, `email` (único), `bio`, `created_at`.
- **posts**: `id`, `author_id` (FK → `authors.id`), `title`, `content`, `published`, `created_at`.

Un autor puede tener muchos posts. Al eliminar un autor, sus posts se eliminan automáticamente (`ON DELETE CASCADE`).

### Stack

- **Node.js** + **Express 5**
- **PostgreSQL** (consultas parametrizadas con `pg`, sin ORM)
- **Vitest** + **supertest** para tests
- **Swagger UI** para documentación interactiva

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [PostgreSQL](https://www.postgresql.org/) instalado y corriendo localmente (o acceso a una instancia remota)
- npm (viene incluido con Node.js)

---

## 🚀 Ejecutar en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/miniblog-api.git
cd miniblog-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos

En PostgreSQL (con `psql` o pgAdmin), crea una base de datos vacía:

```sql
CREATE DATABASE miniblog;
```

### 4. Ejecutar los scripts SQL

Con pgAdmin (Query Tool) o `psql`, ejecuta en orden:

```bash
psql -U postgres -d miniblog -f sql/setup.sql
psql -U postgres -d miniblog -f sql/seed.sql
```

`setup.sql` crea las tablas (`authors`, `posts`) con sus relaciones e índices. `seed.sql` inserta datos de ejemplo para probar la API de inmediato.

### 5. Configurar variables de entorno

Copia `.env.example` a un nuevo archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Y completa los valores según tu instalación local:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=miniblog
DB_PASSWORD=tu_contraseña
DB_PORT=5432
PORT=3000
```

> ⚠️ `.env` nunca se sube a GitHub (está en `.gitignore`). Solo `.env.example` (sin valores reales) se versiona.

### 6. Levantar el servidor

```bash
npm run dev
```

El servidor queda disponible en `http://localhost:3000`.

---

## 🧪 Ejecutar los tests

```bash
npm test
```

Corre la suite completa con Vitest + supertest (tests de `authors` y `posts`: casos exitosos, validaciones y errores 400/404).

---

## 📖 Documentación OpenAPI

La documentación interactiva (Swagger UI) está disponible corriendo el servidor y visitando:

```
http://localhost:3000/docs
```

Desde ahí se pueden ver y probar todos los endpoints directamente en el navegador. La especificación en bruto está en [`openapi.yaml`](./openapi.yaml).

---

## 🌐 Endpoints principales

| Método | Ruta                      | Descripción                                      |
| ------ | ------------------------- | ------------------------------------------------ |
| GET    | `/authors`                | Listar autores                                   |
| GET    | `/authors/:id`            | Detalle de un autor                              |
| POST   | `/authors`                | Crear autor                                      |
| PUT    | `/authors/:id`            | Actualizar autor                                 |
| DELETE | `/authors/:id`            | Eliminar autor (y sus posts, en cascada)         |
| GET    | `/posts`                  | Listar posts                                     |
| GET    | `/posts/:id`              | Detalle de un post                               |
| GET    | `/posts/author/:authorId` | Posts de un autor, con datos del autor incluidos |
| POST   | `/posts`                  | Crear post                                       |
| PUT    | `/posts/:id`              | Actualizar post                                  |
| DELETE | `/posts/:id`              | Eliminar post                                    |

Detalles completos de request/response en `/docs`.

---

## ☁️ Despliegue en Railway

> 🚧 Sección por completar tras el despliegue.

Pasos generales:

1. Crear un nuevo proyecto en [Railway](https://railway.app) y conectar este repositorio de GitHub.
2. Agregar un servicio de **PostgreSQL** desde el catálogo de Railway (esto genera automáticamente sus propias variables de entorno de conexión).
3. En el servicio de la API, configurar las variables de entorno (`DB_USER`, `DB_HOST`, `DB_NAME`, `DB_PASSWORD`, `DB_PORT`, `PORT`) apuntando a la base de datos de Railway.
4. Ejecutar `sql/setup.sql` y `sql/seed.sql` contra la base de datos de Railway (desde su consola integrada o conectándose remotamente).
5. Railway despliega automáticamente en cada `git push` a `main`.

**URL pública:** _(pendiente)_
**Captura del deploy:** _(pendiente)_

---

## 🤖 Registro del uso de IA en el proyecto

Este proyecto fue desarrollado con la asistencia de **Claude (Anthropic)** como apoyo de aprendizaje y pair-programming, dado que es un proyecto educativo para practicar backend. El uso incluyó:

- Explicación de conceptos nuevos (Express, pool de conexiones, consultas parametrizadas, JOINs, ES Modules, testing con Vitest/supertest, OpenAPI).
- Guía paso a paso en la configuración del entorno (Node.js, PostgreSQL, Git/GitHub).
- Revisión y corrección de código escrito por el desarrollador, con explicación de cada error encontrado.
- Sugerencias de estructura de proyecto (separación en `routes`/`services`/`db`) y buenas prácticas (variables de entorno, `.gitignore`, códigos HTTP, manejo de errores).

Todo el código fue escrito, ejecutado y probado directamente por el desarrollador; la IA no tuvo acceso al entorno de ejecución ni a la base de datos.

---

## 📁 Estructura del proyecto

```
miniblog-api/
├── src/
│   ├── db/
│   │   └── pool.js
│   ├── routes/
│   │   ├── authors.js
│   │   └── posts.js
│   ├── services/
│   │   ├── authorsService.js
│   │   └── postsService.js
│   └── app.js
├── sql/
│   ├── setup.sql
│   └── seed.sql
├── tests/
│   ├── authors.test.js
│   └── posts.test.js
├── openapi.yaml
├── .env.example
├── .gitignore
├── package.json
├── vitest.config.js
└── server.js
```
