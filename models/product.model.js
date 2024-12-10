const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../sequelize');

const Product = sequelize.define("products", {
  name: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING(100),
  },
  price: {
    type: DataTypes.FLOAT,
  },
  capacity: {
  type: DataTypes.INTEGER,
  }
});

module.exports = Product