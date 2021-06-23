require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

function getDatabaseUri() {
	const dbUser = process.env.DATABASE_USER || "postgres";
	const dbPass = process.env.DATABSE_PASS
		? encodeURI(process.env.DATABSE_PASS)
		: "postgres";
	const dbHost = process.env.DATABASE_HOST || "localhost";
	const dbPort = process.env.DATABASE_PORT || 5432;
	const dbName = process.env.DATABASE_NAME || "vaccine-registration";

	return (
		process.env.DATABASE_URL ||
		`postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
	);
}

console.log("Vaccine Registration Config: ".red);
console.log("PORT: ".blue, PORT);
console.log("Database URI: ".blue, getDatabaseUri());
console.log("-------");

module.exports = {
	PORT,
	getDatabaseUri,
};
