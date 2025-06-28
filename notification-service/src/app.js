const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbMongo");
const bodyParser = require("body-parser");
const notificationRoutes = require("./routes/notificationRoutes");

connectDB(); // conexión con MongoDB

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/notifications", notificationRoutes);

const { PORT } = require("./config");

app.listen(PORT, () => {
  console.log(`Notification Service corriendo en puerto ${PORT}`);
});
