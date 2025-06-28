const express = require('express');
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/notifications', notificationRoutes);

const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`Notification Service corriendo en puerto ${PORT}`);
});
