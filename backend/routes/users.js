const router = require('express').Router();
const auth = require('../middleware/auth');
const { getUser, getUsers, createUser, updateUser, updateUserAvatar, login } = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateUserAvatar);
router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
