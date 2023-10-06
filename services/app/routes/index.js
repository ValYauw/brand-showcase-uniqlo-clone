const Controller = require('../controllers/controller');
const router = require('express').Router();

const authentication = require('../middleware/authentication');

router.get('/', (req, res, next) => res.send('Welcome to the Yunikuro Server API'));
router.get('/categories', Controller.getCategories);
router.get('/products', Controller.getProducts);
router.get('/products/:id', Controller.getSingleProductById);
router.get('/slug/:slug', Controller.getSingleProductBySlug);

router.use(authentication);

router.post('/categories', Controller.addCategory);
router.put('/categories/:id', Controller.editCategory);
router.post('/products', Controller.addProduct);
router.put('/products/:id', Controller.updateProduct);
router.delete('/products/:id', Controller.deleteProduct);

module.exports = router;