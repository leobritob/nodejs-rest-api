const { database } = require('../../database');
const { v4: uuid } = require('uuid');

class PostsService {
  async findAll() {
    return await database('posts')
      .select('posts.*', 'users.first_name', 'users.last_name')
      .leftJoin('users', 'posts.user_id', 'users.id');
  }

  async create(user) {
    user.id = uuid();
    await database('posts').insert(user);

    return user;
  }

  async update(id, user) {
    return await database('posts')
      .where({ id })
      .update({ ...user, updated_at: new Date() });
  }

  async findOneById(id) {
    return await database('posts').where({ id }).first();
  }

  async findPostsByUserId(userId) {
    return await database('posts').where({ user_id: userId });
  }

  async deleteById(id) {
    await database('posts').where({ id }).del();
  }
}

const postsService = new PostsService();

module.exports = { postsService };
