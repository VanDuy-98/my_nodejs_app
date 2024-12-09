const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../sequelize');

const User = sequelize.define("users", {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  email: {
  type: DataTypes.STRING,
  allowNull: false
  },
  password: {
  type: DataTypes.STRING,
  allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ]
});

module.exports = User