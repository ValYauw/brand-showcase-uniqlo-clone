const Controller = require('../controllers/controller');
const router = require('express').Router();

router.get('/', (req, res) => res.send('Welcome to the Yunikuro API Entrypoint'));

// App Microservice (Get)
router.get('/categories', Controller.getCategories);
router.get('/products', Controller.getProducts);
router.get('/products/:id', Controller.getSingleProductById);
router.get('/slug/:slug', Controller.getSingleProductBySlug);

// App Microservice (CUD)
router.post('/categories', Controller.addCategory);
router.put('/categories/:id', Controller.editCategory);
router.post('/products', Controller.addProduct);
router.put('/products/:id', Controller.updateProduct);
router.delete('/products/:id', Controller.deleteProduct);

// User Microservice
router.post('/login', Controller.login);
router.post('/register', Controller.register);
router.post('/staff/register', Controller.registerNewStaff);
router.get('/users', Controller.getUsers);
router.get('/users/:id', Controller.getUser);
router.get('/users/email/:email', Controller.getUserByEmail);
router.delete('/users/:id', Controller.deleteUser);

module.exports = router;
