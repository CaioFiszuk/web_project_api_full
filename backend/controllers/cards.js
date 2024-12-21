const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(500).send({ message: "Houve um erro no servidor" })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;

  if (!name || !link || !owner) {
    return res.status(400).send({ message: "Dados inválidos" });
  }

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(500).send({ message: "Erro no servidor ao criar um card" })
    );
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      const error = new Error('O cartão não foi encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {

      if (String(card.owner._id) !== String(req.user._id)) {
        const error = new Error('Você não tem permissão para excluir este cartão');
        error.statusCode = 403;
        throw error;
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      res.send({ data: deletedCard });
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      const message = statusCode === 500
        ? 'Houve um erro no servidor interno'
        : err.message;

      res.status(statusCode).send({ message });
    });
};


module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .orFail(()=>{
    const error = new Error('Esse usuário não existe');
    error.statusCode = 404;
    throw error;
  })
   .then(user => res.send({ data: user }))
   .catch(err =>  {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500
      ? 'Houve um erro no servidor interno'
      : err.message;

    res.status(statusCode).send({ message });
  });
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .orFail(()=>{
    const error = new Error('Esse usuário não existe');
    error.statusCode = 404;
    throw error;
  })
   .then(user => res.send({ data: user }))
   .catch(err =>  {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500
      ? 'Houve um erro no servidor interno'
      : err.message;

    res.status(statusCode).send({ message });
  });
}