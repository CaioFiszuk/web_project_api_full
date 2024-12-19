const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const app = express();
const { requestLogger, errorLogger } = require('./middleware/logger');

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

app.use(errorLogger);

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`)
);
