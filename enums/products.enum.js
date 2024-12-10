const success = {
  store: 'Create product successfully',
  update: 'Update product successfully',
  delete: 'Delete product successfully'
}

const fail = {
  get_products: 'Error get products',
  get_product_by_id: 'Error get product by id',
  store_product: 'Error store product',
  update_product: 'Error update product',
  delete_product: 'Error delete product',
  missing_id_param: 'Missing id param',
  not_found: 'Not found product data',
  missing_body_data: 'Missing body data'
}

module.exports = {
  success,
  fail
}