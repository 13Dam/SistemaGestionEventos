const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/dbMongo");
require("dotenv").config();

const PORT = process.env.PORT || 5003;

//Conectar a la base de datos
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas
const scheduleRoutes = require("./routes/scheduleRoutes");
app.use("/api/schedule", scheduleRoutes);

//Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Schedule Service en funcionamiento en el puerto ${PORT}`);
});
