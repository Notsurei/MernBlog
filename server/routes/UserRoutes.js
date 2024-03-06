const express = require('express');
const { getAllUser, createUser, deleteUser, Login, getOneUser, forgotPassword, resetPassword,  } = require('../controllers/usercontrollers');

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getOneUser);
router.post('/register', createUser);
router.post('/signin', Login);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);
router.delete('/:id', deleteUser);

module.exports = router;