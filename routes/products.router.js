const { Router } = require('express');
const router = Router();

const authMiddleware = require('../middlewares/authentication.middleware');
const productController = require('../controllers/products.controller');

router.use(authMiddleware.authenticateToken)

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.store);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove)

module.exports = router