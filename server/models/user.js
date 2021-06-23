const db = require("../db");
const { UnauthorizedError } = require("../utils/errors");

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
		// user should submit their date_of_birth, genre, first_name, last_name, email, password
		// if any of these fields are missing throw an error
		//
		// ,ake sure no user aready exists in the systme with that email
		// if one does throw an error
		//
		// take the users password, and hash it
		// take the user's email and lowercase it
		//
		// create a new user in the db with all their info
		// return the user
	}
}

module.exports = User;
