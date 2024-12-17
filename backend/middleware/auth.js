const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Autorização é necessária' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, '2222');
  } catch (err) {

    return res
      .status(403)
      .send({ message: 'Não autorizado' });

  }

  req.user = payload;

  next();
};