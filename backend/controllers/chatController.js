const Chat = require('../models/Chat');

exports.getOrCreateChat = async (req, res) => {
  const { mentorId, adminId } = req.body;
  let chat = await Chat.findOne({ mentor: mentorId, admin: adminId });
  if (!chat) {
    chat = new Chat({ mentor: mentorId, admin: adminId, messages: [] });
    await chat.save();
  }
  res.json(chat);
};

exports.sendMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const chat = await Chat.findById(chatId);
  chat.messages.push({ sender: senderId, text });
  await chat.save();
  res.json(chat);
};

exports.getChatMessages = async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId).populate('messages.sender', 'name role');
  res.json(chat.messages);
};
