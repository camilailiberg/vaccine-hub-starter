const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/login", async (req, res, next) => {
	try {
		// take the user's email and passwprd and attempt to authenticate them
		const user = await User.login(req.body);
		return res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
});

router.post("/register", async (req, res, next) => {
	try {
		//take the user's date_of_birth, genre, first_name, last_name, email, password
		//create a new user in the database
		const user = await User.register(req.body);
		res.status(201).json({ user });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
