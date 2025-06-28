const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbMongo");
require("dotenv").config();

const PORT = process.env.PORT || 5002;

connectDB();

const registrationRoutes = require("./routes/registrationRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/registrations", registrationRoutes);

app.listen(PORT, () => {
  console.log(`Registration Service en funcionamiento en el puerto ${PORT}`);
});
