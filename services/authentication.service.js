const database = require('../database');
const bcrypt = require('bcrypt');

async function getRegisterPage(req, res) {
  try {
    return await res.status(200).render('../views/authentications/register');
  } catch (err) {
    console.error('Error get register page: ', err.message);
    res.status(500).send('An error occurred');
  }
}

async function register(req, res) {
  try {
    if(req.body) {
      const {firstName, lastName, address, email, password} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      query = `INSERT INTO users (firstName, lastName, address, email, password) VALUES (?, ?, ?, ?, ?)`;
      await database.query(query, [firstName, lastName, address, email, hashedPassword]);
      
      return res.status(201).send('User registered successfully');
    }
  } catch (err) {
    console.error('Error register: ', err.message);
    res.status(500).send('An error occurred');
  }
}

async function getLoginPage(req, res) {
  try {
    return await res.status(200).render('../views/authentications/login', {session : req.session});
  } catch (err) {
    console.error('Error get login page: ', err.message);
    res.status(500).send('An error occurred');
  }
}

async function login(req, res) {
  const user_email_address = req.body.user_email_address;

  const user_password = req.body.user_password;

  if(user_email_address && user_password) {
      query = `
      SELECT * FROM user_login 
      WHERE user_email = "${user_email_address}"
      `;

       await database.query(query, (error, data) => {
          if(data && data.length > 0) {
              for(let i = 0; i < data.length; i++) {
                  if(data[i].user_password == user_password) {
                      req.session.user_id = data[i].user_id;

                      res.redirect("/");
                  } else {
                      res.send('Incorrect Password');
                  }
              }
          } else {
              res.send('Incorrect Email Address');
          }
          res.end();
      });
  } else {
      res.send('Please Enter Email Address and Password Details');
      res.end();
  }
}

function logout(req, res) {
  req.session.destroy();

  res.redirect("/")
}

module.exports = {
  login,
  getLoginPage,
  logout,
  getRegisterPage,
  register
}