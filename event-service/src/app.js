const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbMongo");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

connectDB();

const eventRoutes = require("./routes/eventRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/eventos", eventRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
