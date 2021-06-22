const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFoundError } = require("./utils/errors");
const authRoute = require("./routes/auth");

const app = express();

//! middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//! Routes
app.use("/", authRoute); //! this is a middleware too

//! Error handling
//* This will handle all 404 Errors that were not matched by a route
app.use((req, res, next) => {
	return next(new NotFoundError());
});

//* Generic Error handler - anything that is unhandle wull be hnadled here
app.use((error, req, res, next) => {
	const status = error.status || 500;
	message = error.message;
	return res.status(status).json({
		error: { message: message, status: status },
	});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`🚀 Server running http://localhost:${PORT}`);
});
