const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const auth = req.headers['authorization'];
    if (!auth) throw new Error();

    const [type, token] = auth.split(' ');

    if (type.toLowerCase() !== 'bearer') throw new Error();

    const isValid = jwt.verify(token, process.env.SECRET_KEY);
    if (!isValid) throw new Error();

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido!' });
  }
};

module.exports = { authenticateToken };
