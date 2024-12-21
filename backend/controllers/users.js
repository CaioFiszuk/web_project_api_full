const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
  .then((user) => {
    if(!user){
      const error = new Error('Esse no servidor');
      error.statusCode = 500;
      throw error;
    }

    res.send({ data: user })
  })
  .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
  .orFail(()=>{
    const error = new Error('Esse usuário não existe');
    error.statusCode = 404;
    throw error;
  })
  .then(user => res.send({ data: user }))
  .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, ...data } = req.body;

  if (!email || !password) {
    const error = new Error('Dados Inválidos');
    error.statusCode = 400;
    throw error;
  }

  bcrypt.hash(password, 10)
  .then(hash => User.create({
    email,
    password: hash,
    ...data
  }))
  .then(user => res.status(201).send({ data: user }))
  .catch(next);
};


module.exports.updateUser = (req, res) => {
  if (req.user._id !== req.params.id) {
    const error = new Error('Você não tem permissão para editar esse perfil');
    error.statusCode = 403;
    throw error;
  }

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
  if (req.user._id !== req.params.id) {
    const error = new Error('Você não tem permissão para editar esse perfil');
    error.statusCode = 403;
    throw error;
  }

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

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('E-mail ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      const error = new Error('E-mail ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '7d' });

    return res.status(200).json({ token });

  } catch (err) {
    next(err);
  }
};
