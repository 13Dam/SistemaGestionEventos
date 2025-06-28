# Registration Service

Microservicio para la gestión de inscripciones de participantes dentro del sistema de gestión de eventos y conferencias profesionales.

Este servicio permite registrar inscripciones de usuarios a eventos, generar códigos QR para credenciales de acceso y consultar las inscripciones realizadas por un usuario.

## Funcionalidades

- Crear inscripciones a eventos
- Generar código QR con los datos de la inscripción
- Consultar inscripciones del usuario autenticado

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv
- CORS
- qrcode

## Instalación

1. Cloná el repositorio o copiá este microservicio al proyecto:
   git clone <https://github.com/13Dam/SistemaGestionEventos>
   cd registration-service

2. Instalá las dependencias:
   npm install
   Configurá las variables de entorno:

Creá un archivo .env en la raíz del proyecto con este contenido:
PORT=5002
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
http://localhost:5002/api/registrations

4. Seguridad
   Este microservicio utiliza JWT para validar la autenticación de los usuarios.
   Las rutas protegidas requieren el siguiente header:
   Authorization: Bearer <tu_token_jwt>

5. Endpoints principales
   POST /api/registrations Crear nueva inscripción
   GET /api/registrations/mine Obtener inscripciones del usuario autenticado
