const express = require('express');
const {sendMessage ,getMessages}= require('../controllers/messageController');
const {  verifyToken} = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post("/send/:id", verifyToken,sendMessage);
router.get("/:id", verifyToken, getMessages);

module.exports = router