const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
	const { username, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({ username, password: hashedPassword });

	await user.save();
	res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });

	if (user && (await bcrypt.compare(password, user.password))) {
		return res.status(200).json({ username: user.username }); // Include username
	}
	return res.status(401).json({ message: "Invalid credentials" });
};
