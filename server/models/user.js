const bcrypt = require("bcrypt");
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
	static async login(credentials) {
		// user should submit their email and password
		// if any of these fields are missing throw an error
		//
		// lookup the user ins the db by email
		// if a user is found, compare the submitted password
		// with the password in the db
		// if there is a match, return the user
		//
		// if any of these go wrong, throw an error
	}

	static async register(credentials) {
		// user should submit their date_of_birth, location, first_name, last_name, email, password
		// if any of these fields are missing throw an error
		const requiredFields = [
			"date",
			"location",
			"first_name",
			"last_name",
			"email",
			"password",
		];
		requiredFields.forEach((property) => {
			if (!credentials.hasOwnProperty(property)) {
				throw new BadRequestError(`Missing ${property} in request body.`);
			}
		});
		// Make sure no user aready exists in the systme with that email
		// if one does throw an error
		if (credentials.email.indexOf("@") <= 0) {
			throw new BadRequestError("Invalid email.");
		}
		const existingUser = await User.fetchUserByEmail(credentials.email);
		if (existingUser) {
			throw new BadRequestError(
				`A user already exists with email: ${credentials.email}`
			);
		}
		// take the users password, and hash it
		const hashedPassword = await bcrypt.hash(
			credentials.password,
			BCRYPT_WORK_FACTOR
		);
		// take the user's email and lowercase it
		const lowercaseEmail = credentials.email.toLowerCase();
		// create a new user in the db with all their info
		// return the user
		const userResult = await db.query(
			`INSERT INTO users (date, location, first_name, last_name, password,email) VALUES ($1, $2, $3, $4) RETURNING date, location, first_name, last_name, password,email;`,
			[
				credentials.credentials.first_name,
				credentials.last_name,
				hashedPassword,
				lowercaseEmail,
			]
		);
		const user = userResult.rows[0];

		return user;
	}

	static async fetchUserByEmail(email) {
		if (!email) {
			throw new BadRequestError("No email provided");
		}

		const query = `SELECT * FROM users WHERE email = $1`;

		const result = await db.query(query, [email.toLowerCase()]);

		const user = result.rows[0];

		return user;
	}
}

module.exports = User;
