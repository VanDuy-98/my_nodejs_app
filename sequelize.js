const dotenv = require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch((error) => {
	console.error('Unable to connect to the database: ', error);
});

sequelize.sync().then(() => {
	console.log('Table created successfully!');
}).catch((error) => {
	console.error('Unable to create table : ', error);
});

module.exports = sequelize;