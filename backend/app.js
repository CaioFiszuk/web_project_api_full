const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

const { PORT = 3000 } = process.env;

/*app.use((req, res, next) => {
  req.user = {
    _id: '6741de952ccdb3c9dbe485cc'
  };

  next();
});*/

app.use('/users', userRoutes);

app.use('/cards', cardsRoutes);

app.use((req, res) => {
  res.status(404).send({ message:"A solicitação não foi encontrada" });
});


app.use((err, req, res, next) => {
  res.status(500).send({ message: "Ocorreu um erro interno no servidor. Tente novamente mais tarde." });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`)
);
