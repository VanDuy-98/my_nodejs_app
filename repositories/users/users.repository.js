const User = require('../../models/user.model');
const { where } = require('sequelize');

async function getUserByEmail(emailParam) {
  return await User.findOne({ where: { email: emailParam} });
}

async function getUserById(id) {
  return await User.findByPk(id);
}

async function store(data) {
  return await User.create(data) 
}

module.exports = {
  store,
  getUserById,
  getUserByEmail
}