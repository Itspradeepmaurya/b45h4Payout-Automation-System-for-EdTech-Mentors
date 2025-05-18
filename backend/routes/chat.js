const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.post('/get-or-create', auth, chatController.getOrCreateChat);
router.post('/send', auth, chatController.sendMessage);
router.get('/messages/:chatId', auth, chatController.getChatMessages);

module.exports = router;
