const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

router.post("/", async (req, res) => {
	const { username, message } = req.body;
	const newMessage = new Message({ username, message });
	await newMessage.save();
	res.status(201).json(newMessage);
});

router.get("/", async (req, res) => {
	const messages = await Message.find().sort({ createdAt: -1 });
	res.status(200).json(messages);
});

module.exports = router;
