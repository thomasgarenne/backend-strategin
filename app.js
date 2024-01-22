const express = require('express');
const mongoose = require('./db');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Middleware cors
const corsOptions = {
  origin: 'https://effortless-ganache-d7ba11.netlify.app',
  methods: 'GET,POST',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Utilisation du routeur pour les routes des utilisateurs
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});