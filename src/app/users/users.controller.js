const { Router } = require('express');
const { usersService } = require('./users.service');
const { postsService } = require('../posts/posts.service');
const { authenticateToken } = require('../../helpers/auth');
const { createUserValidator, updateUserValidator } = require('./users.dto');

const UsersRouter = Router();

UsersRouter.get('/v1/users', authenticateToken, async (req, res) => {
  const users = await usersService.findAll();

  return res.status(200).json({ users });
});

UsersRouter.post('/v1/users', createUserValidator, async (req, res) => {
  const { body } = req;

  const user = await usersService.create(body);

  return res.status(201).json(user);
});

UsersRouter.get('/v1/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await usersService.findOneById(id);

  return res.status(200).json(user);
});

UsersRouter.get('/v1/users/:id/posts', async (req, res) => {
  const { id } = req.params;

  const posts = await postsService.findPostsByUserId(id);

  return res.status(200).json(posts);
});

UsersRouter.put('/v1/users/:id', updateUserValidator, async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const user = await usersService.update(id, body);

  return res.status(200).json(user);
});

UsersRouter.delete('/v1/users/:id', async (req, res) => {
  const { id } = req.params;

  await usersService.deleteById(id);

  return res.status(204).send();
});

module.exports = { UsersRouter };
