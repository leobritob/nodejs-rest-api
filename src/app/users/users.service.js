const { database } = require('../../database');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

class UsersService {
  async findAll() {
    return await database('users');
  }

  async create(user) {
    user.id = uuid();
    user.password = await bcrypt.hash(user.password, 10);

    await database('users').insert(user);

    return user;
  }

  async update(id, user) {
    return await database('users')
      .where({ id })
      .update({ ...user, updated_at: new Date() });
  }

  async findOneById(id) {
    return await database('users').where({ id }).first();
  }

  async findOneByEmail(email) {
    return await database('users').where({ email }).first();
  }

  async deleteById(id) {
    await database('users').where({ id }).del();
  }
}

const usersService = new UsersService();

module.exports = { usersService };
