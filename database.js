const mysql = require('mysql');
const dotenv = require('dotenv').config()

const connection = mysql.createConnection({
	host : process.env.DATABASE_HOST,
	database : process.env.DATABASE_NAME,
	user : process.env.DATABASE_USER,
	password : process.env.DATABASE_PASS
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;