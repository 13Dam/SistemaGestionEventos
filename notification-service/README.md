# Event Service

Microservicio para la gestión de notificaciones dentro del sistema de gestión de eventos y conferencias profesionales.

Este servicio se encarga de enviar comunicaciones a los participantes, incluyendo recordatorios de actividades y alertas sobre cambios en la programación. Utiliza una cola para procesar las notificaciones de forma asíncrona y soporta envío de emails

## Funcionalidades

- Enviar notificaciones por email
- Manejar colas para procesamiento asíncrono de mensajes
- Soportar distintos tipos de notificaciones (recordatorio, alerta, actualización)
- Validar y proteger rutas mediante autenticación JWT
- Integración con MongoDB para persistencia de notificaciones

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv
- CORS
- nodemailer

## Instalación

1. Cloná el repositorio o copiá este microservicio al proyecto:
   git clone <https://github.com/13Dam/SistemaGestionEventos>
   cd notification-service

2. Instalá las dependencias:
   npm install
   Configurá las variables de entorno:

Creá un archivo .env en la raíz del proyecto con este contenido:
PORT=5004
MONGODB_URI=mongodb://localhost:27017/sistema_eventos
EMAIL_USER=tu_email@dominio.com
EMAIL_PASS=tu_contraseña_email
EMAIL_HOST=gmail
JWT_SECRET=REEMPLAZAR_CON_SECRETO
JWT_REFRESH_SECRET=REEMPLAZAR_CON_SECRETO_REFRESH

JWT_SECRET debe coincidir con el usado en el microservicio de autenticación (auth-service).

3. Ejecución del servidor
   En modo producción:
   npm start

En modo desarrollo (si usás nodemon):
npm run dev
El servidor arrancará en:
http://localhost:5004/notifications

4. Seguridad
   Este microservicio utiliza JWT para validar la autenticación de los usuarios.
   Las rutas protegidas requieren el siguiente header:
   Authorization: Bearer <tu_token_jwt>

5. Endpoints principales
   POST /notifications/send Enviar una nueva notificación (email)
