const { Router } = require('express');
const { authService } = require('./auth.service');

const AuthRouter = Router();

AuthRouter.post('/auth/token', async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authService.generateToken(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = { AuthRouter };
