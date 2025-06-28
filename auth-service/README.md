# Auth Service – Sistema de Gestión de Eventos

Este microservicio gestiona la autenticación de usuarios para una plataforma de conferencias y eventos profesionales. Implementa autenticación básica, tokens JWT, refresh tokens y verificación de doble factor (2FA) con TOTP.

## Funcionalidades

- Registro de usuarios (asistente, organizador, expositor)
- Inicio de sesión con Auth Basic (email + password)
- Configuración de segundo factor de autenticación (TOTP)
- Verificación de código TOTP con Google Authenticator u otra app
- Generación y validación de JWT y refresh tokens

## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt (para el hash de contraseñas)
- speakeasy (para generar/verificar códigos TOTP)
- qrcode (para generar códigos QR del segundo factor)
- dotenv
- CORS

## Instalación

1. Cloná el repositorio o copiá este microservicio al proyecto:
   git clone <https://github.com/13Dam/SistemaGestionEventos>
   cd auth-service

2. Instalá las dependencias:
   npm install
   Configurá las variables de entorno:

Creá un archivo .env en la raíz del proyecto con este contenido:
PORT=5000
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
   http://localhost:5000/api/auth

4. Seguridad
   Este microservicio gestiona la seguridad del sistema mediante múltiples capas:

   - Auth Basic para registro e inicio de sesión inicial
   - TOTP como segundo factor de autenticación (2FA)
   - JWT firmado con JWT_SECRET para el acceso a otros microservicios
   - Refresh Tokens firmados con JWT_REFRESH_SECRET para renovar sesiones

5. Endpoints principales
   POST /api/auth/register Registrar un nuevo usuario
   POST /api/auth/login Iniciar sesión (email + contraseña)
   POST /api/auth/verify-otp Verificar el código TOTP y obtener JWT + refresh token
   POST /api/auth/refresh Obtener nuevo JWT a partir del refresh token
