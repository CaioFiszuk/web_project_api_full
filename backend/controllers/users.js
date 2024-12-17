const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(user => res.send({ data: user }))
  .catch(err =>
    res.status(500).send({ message: 'Erro no servidor' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
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
};

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Dados inválidos' });
  }

  bcrypt.hash(password, 10)
  .then(hash => User.create({
    email,
    password: hash
  }))
  .then(user => res.status(201).send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Erro no servidor ao criar o usuário.' }));
};


module.exports.updateUser = (req, res) => {
   User.findByIdAndUpdate(req.user._id, { name: req.body.name })
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

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
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

module.exports.login = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error('E-mail ou senha incorretos'));
    }

    const token = jwt.sign({ id: user._id }, '2222', { expiresIn: '7d' });

    return res.status(200).json({ token });

  })
  .catch((err) => {
    res
      .status(401)
      .send({ message: err.message });
  });
}