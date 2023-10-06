const Controller = require('../controllers/controller');
const router = require('express').Router();

const authentication = require('../middleware/authentication');
// const { authorizeStaff } = require('../middleware/authorization');

router.get('/', (req, res, next) => res.send('Welcome to the Yunikuro Users API'));
router.post('/login', Controller.login);
router.post('/register', Controller.register);
router.get('/users/:id', Controller.getUser);
router.get('/users/email/:email', Controller.getUserByEmail);

router.use(authentication);

router.post('/staff/register', Controller.registerNewStaff);
router.get('/users', Controller.getUsers);
// router.patch('/users/:id', Controller.editUser);
router.delete('/users/:id', Controller.deleteUser);

module.exports = router;