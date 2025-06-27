const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbMongo");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDB(); // conexión con MongoDB

const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
