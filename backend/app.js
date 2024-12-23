const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const app = express();
const { requestLogger, errorLogger } = require('./middleware/logger');
require("dotenv").config();

app.use(cors());
app.options('*', cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION)
.then(()=>{
  console.log("Banco de dados conectado");
});

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

app.use(errorLogger);

app.use((err, req, res, next) => {
   console.log("erro:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`)
);
