const { usersService } = require('../users/users.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  secret = process.env.SECRET_KEY;

  async generateToken(email, password) {
    try {
      const user = await usersService.findOneByEmail(email);
      if (!user) throw new Error();

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error();

      return jwt.sign({ sub: user.id }, this.secret, { expiresIn: '30s' });
    } catch (error) {
      throw new Error('E-mail e/ou senha inválidos.');
    }
  }
}

const authService = new AuthService();

module.exports = { authService };
