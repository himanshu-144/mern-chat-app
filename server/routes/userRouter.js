const express = require('express');
const { verifyToken } = require('../middlewares/authMiddlewares');
const getUsers = require('../controllers/userController');


const router = express.Router();

router.get("/", verifyToken, getUsers); // only login users

module.exports = router