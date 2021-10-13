const express = require('express');
const { json } = require('body-parser');

const routerUsers = require('./Routes/routeUsers');

require('dotenv').config();

const { ConnectionDB } = require('./DataBase/config');
const port = process.env.PORT || 3000;
const app = express();

app.use(json());

app.use('/users', routerUsers);

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await ConnectionDB();
});