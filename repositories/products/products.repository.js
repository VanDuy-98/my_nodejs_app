const Product = require('../../models/product.model')

async function getAll() {
  return await Product.findAll();
}
async function getProductById(id) {
  return await Product.findByPk(id);
}

async function store(data) {
  return await Product.create(data);
}

async function update(idParam, data) {
  return await Product.update(data, {
      where: {
        id: idParam,
      },
    },
  );
}

async function remove(idParam) {
  return await Product.destroy({
    where: {
      id: idParam,
    },
  });
}

module.exports = {
  getProductById,
  store,
  update,
  getAll,
  remove
}