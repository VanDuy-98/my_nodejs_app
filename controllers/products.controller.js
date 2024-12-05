const productService = require('../services/products.service');

async function getProducts(req, res, next) {
  return await productService.getProducts(req, res, next);
}

async function getProductById(req, res, next) {
  return await productService.getProductById(req, res, next);
}

async function store(req, res, next) {
  return await productService.store(req, res, next);
}

async function update(req, res, next) {
  return await productService.update(req, res, next);
}

module.exports = {
  getProducts,
  getProductById,
  store,
  update
}