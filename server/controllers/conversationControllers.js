//const { rawListeners } = require("../models/Conversation");
const Conversation = require("../models/Conversation");

const conversationControllers = {
  newConversation: async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    try {
      const repeatedConversation = await Conversation.findOne({
        senderId: req.body.senderId,
      });
      /* if (repeatedConversation) {
        res.json("The user already have a conversation.");
      } else {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
      } */ const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserConversation: async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getTwoUsers: async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = conversationControllers;
