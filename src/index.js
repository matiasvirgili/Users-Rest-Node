const express = require('express');
const { json } = require('body-parser');

const routerUsers = require('./Router/routeUsers');

require('dotenv').config();

const { ConnectionDB } = require('./DataBase/config');
const port = process.env.PORT || 3000;
const app = express();

app.use(json());

app.get('/', (req, res) => {
  res.type('text/plain').send('Server OK');
});

app.use('/users', routerUsers);


app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await ConnectionDB();
});