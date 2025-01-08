const router = require('express').Router();
const { getUser, getUsers, createUser, updateUser, updateUserAvatar, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
