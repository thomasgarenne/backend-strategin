const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

// Enregistre un nouvel utilisateur
const register = async (req, res, next) => {
	try {
		const user = new User({
			email: req.body.email,
			password: req.body.password,
		});
	
		const savedUser = await user.save();
	
		res.status(201).json({ savedUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

// Connecte un utilisateur
const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const validPassword = await bcrypt.compare(req.body.password, user.password);

		if (!validPassword) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const authToken = jwt.sign(
			{ userId: user._id }, 
			secretKey, 
			{ expiresIn: '1h' }
		);

		user.authToken = authToken;
		await user.save();

		res.status(200).json({ message: "Logged in successfully 😊 👌", authToken: authToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

// Retourne tous les utilisateurs
const users = async (req, res, next) => {
	try {
		const users = await User.find();
	  
		if (users.length === 0) {
			res.status(404).json({ message: "No user to display" });
		} else {
			res.status(200).json(users);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error retrieving users" });
	}
};

module.exports = { register, login, users };
