const db = require('../../database')

function getUserDataByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, data, fields) => {
      err ? reject(err) : resolve(data)
    })
  })
}

/**
 * 
 * @param {Array} data 
 */
async function store(data) {
  await db.query('INSERT INTO users (firstName, lastName, address, username, email, password) VALUES (?, ?, ?, ?, ?, ?)', data);  
}

module.exports = {
  getUserDataByEmail,
  store
}