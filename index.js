require('dotenv').config();
const express = require('express');
const { UsersRouter } = require('./src/app/users/users.controller');
const { PostsRouter } = require('./src/app/posts/posts.controller');
const { AuthRouter } = require('./src/app/auth/auth.controller');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Api is OK!' }));
app.use('/api', [UsersRouter, PostsRouter, AuthRouter]);

app.listen(3333, () => console.log('Server is running...'));
