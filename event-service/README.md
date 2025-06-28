# Event Service

Microservicio para la gestión de eventos dentro del sistema de gestión de eventos y conferencias profesionales.

Este servicio permite crear, configurar y administrar eventos, incluyendo la fecha, ubicación, capacidad y estado del evento. Además, se registra automáticamente el usuario que creó cada evento.

## Funcionalidades

- Crear nuevos eventos
- Editar o eliminar eventos existentes
- Consultar lista de eventos
- Controlar el estado de los eventos (planificación, activo, finalizado)
- Asignar automáticamente el creador del evento (`creadoPor`)

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv
- CORS

## Instalación

1. Cloná el repositorio o copiá este microservicio al proyecto:
   git clone <https://github.com/13Dam/SistemaGestionEventos>
   cd event-service

2. Instalá las dependencias:
   npm install
   Configurá las variables de entorno:

Creá un archivo .env en la raíz del proyecto con este contenido:
PORT=5001
MONGODB_URI=mongodb://localhost:27017/sistema_eventos
JWT_SECRET=REEMPLAZAR_CON_SECRETO
JWT_REFRESH_SECRET=REEMPLAZAR_CON_SECRETO_REFRESH

JWT_SECRET debe coincidir con el usado en el microservicio de autenticación (auth-service).

3. Ejecución del servidor
   En modo producción:
   npm start

En modo desarrollo (si usás nodemon):
npm run dev
El servidor arrancará en:
http://localhost:5001/api/events

4. Seguridad
   Este microservicio utiliza JWT para validar la autenticación de los usuarios.
   Las rutas protegidas requieren el siguiente header:
   Authorization: Bearer <tu_token_jwt>

5. Endpoints principales
   POST /api/events Crear un nuevo evento (solo organizadores o admin)
   GET /api/events Obtener todos los eventos
   GET /api/events/:id Obtener detalle de un evento por ID
   PUT /api/events/:id Modificar un evento existente
   DELETE /api/events/:id Eliminar un evento
