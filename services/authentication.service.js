const database = require('../database')

function getLoginPage(req, res) {
  return res.render('../views/authentications/login', {session : req.session});
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
  logout
}