const success = {
  store: 'Create product successfully',
  update: 'Update product successfully',
}

const fail = {
  get_products: 'Error get products',
  get_product_by_id: 'Error get product by id',
  store_product: 'Error store product',
  update_product: 'Error update product',
  missing_id_param: 'Missing id param',
  not_found: 'Not found product data',
  missing_body_data: 'Missing body data'
}

module.exports = {
  success,
  fail
}