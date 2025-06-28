# Schedule Service

Microservicio para la gestión de programación de actividades dentro del sistema de gestión de eventos y conferencias profesionales.

Este servicio permite registrar, consultar, modificar y eliminar actividades de eventos, verificando automáticamente conflictos de horarios en salas y expositores.

## Funcionalidades

- Crear actividades asociadas a un evento
- Validar solapamientos en salas y expositores
- Listar actividades por evento
- Ver detalles de una actividad
- Modificar y eliminar actividades

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
cd schedule-service

2. Instalá las dependencias:
   npm install

Configurá las variables de entorno:

Creá un archivo .env en la raíz del proyecto con este contenido:

PORT=5004
MONGODB_URI=mongodb://localhost:27017/sistema_eventos
JWT_SECRET=REEMPLAZAR_CON_SECRETO
JWT_REFRESH_SECRET=REEMPLAZAR_CON_SECRETO_REFRESH

JWT_SECRET debe coincidir con el del microservicio de autenticación (auth-service).

3. Ejecución del servidor
   En modo producción:
   npm start

En modo desarrollo (si tenés nodemon instalado):
npm run dev

El servidor arrancará en:
http://localhost:5003/api/schedule

4. Seguridad
   Este microservicio utiliza JWT para validar la autenticación de los usuarios.
   Se requiere que las rutas protegidas incluyan un header como este:
   Authorization: Bearer <tu_token_jwt>

5. Endpoints principales
   GET /api/schedule/:eventId Listar actividades de un evento
   POST /api/schedule Crear nueva actividad
   GET /api/schedule/actividad/:id Obtener actividad por ID
   PUT /api/schedule/actividad/:id Actualizar actividad
   DELETE /api/schedule/actividad/:id Eliminar actividad
