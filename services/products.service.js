const productRepo = require('../repositories/products/products.repository');
const productEnum = require('../enums/products.enum');
const helpers = require('../helpers/helper');
const { name } = require('ejs');

async function getProducts(req, res, next) {
  try {
    const products = await productRepo.getProducts();
    res.status(200).json({ products })
  } catch (err) {
    console.error(`${productEnum.fail.get_products}: `, err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

async function getProductById(req, res, next) {
  try {
    const productId = parseInt(req.params.id, 10);

    if (!productId) {
      return res.status(400).json({ data: productEnum.fail.missing_id_param });
    }

    const product = await productRepo.getProductById(productId);

    if (helpers.isEmpty(product)) {
      return res.status(404).json({ data: productEnum.fail.not_found });
    }

    res.status(200).json({ product })
    
  } catch (err) {
    console.error(`${productEnum.fail.get_product_by_id}: `, err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

async function store(req, res, next) {
  try {
    const requestData = req.body;

    if (helpers.isEmpty(requestData)) {
      return res.status(400).json({ data: productEnum.fail.missing_body_data});
    }

    await productRepo.store(Object.values(requestData));
    
    res.status(200).json({ data: productEnum.success.store });
  } catch (err) {
    console.error(`${productEnum.fail.store_product}: `, err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

async function update(req, res, next) {
  try {
    const productId = parseInt(req.params.id, 10);

    if (!productId) {
      return res.status(400).json({ data: productEnum.fail.missing_id_param });
    }

    const requestData = req.body;


    if (helpers.isEmpty(requestData)) {
      return res.status(400).json({ data: productEnum.fail.missing_body_data});
    }

    let updateData = [];
    const product = await productRepo.getProductById(productId);

    if (helpers.isEmpty(product)) {
      return res.status(404).json({ data: productEnum.fail.not_found });
    }

    console.log(product[0].image);
    

    for (const key in product[0]) {
      if (Object.prototype.hasOwnProperty.call(requestData, key)) {
        updateData[key] = requestData[key];
      } else {
        updateData[key] = product[0].key
      }
    }


    console.log(updateData);
    

    // await productRepo.update(productId, requestData)

    res.status(200).json({ data: productEnum.success.update });
  } catch (err) {
    console.error(`${productEnum.fail.update_product}: `, err.message);
    res.status(500).json({ data: 'An error occurred' }).end();
  }
}

module.exports = {
  getProducts,
  getProductById,
  store,
  update
}