const express = require('express');
const router = express.Router();
const {deleteUserById, getUserById, updateUserById} = require('../controllers/userController')
const {verifyJwt} = require('../middlewares/verifyJwt')


router.get('/user/:id',verifyJwt, getUserById);
router.delete('/user/:id', verifyJwt, deleteUserById);
router.put('/user/:id', verifyJwt, updateUserById)

module.exports = router;