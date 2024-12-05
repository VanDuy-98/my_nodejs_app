const { name } = require('ejs');
const db = require('../../sequelize');

function getProducts() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products', (err, data, fields) => {
      err ? reject(err) : resolve(data);
    })
  })
}

function getProductById(id) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products WHERE id = ${id}`, (err, data, fields) => {
      err ? reject(err) : resolve(data);
    })
  })
}

async function store(data) {
  await db.query('INSERT INTO products (name, image, color, price, capacity) VALUES (?, ?, ?, ?, ?)', data);
}

async function update(id, data) {
  let sql = 'UPDATE products SET ';
  if (data.name) {
    sql += `name = '${data.name}' `;
  }

  if (data.image) {
    sql += `image = '${data.image}' `;
  }

  if (data.color) {
    sql += `color = '${data.color}' `;
  }

  if (data.price) {
    sql += `price = '${data.price}', `;
  }

  if (data.capacity) {
    sql += `capacity = '${data.capacity}'`;
  }

  sql += ` WHERE id = ${id}`;

  console.log(sql);
  

  // await db.query(sql);
}

module.exports = {
  getProducts,
  getProductById,
  store,
  update
}