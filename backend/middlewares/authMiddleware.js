const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
	const jwtToken =
		req.headers.authorization && req.headers.authorization.split(" ")[1];

	// console.log(jwtToken);
	if (!jwtToken || jwtToken === null) {
		return res
			.status(401)
			.json({ message: "Unauthorized - Missing token." });
	}

	try {
		const decoded = jwt.verify(jwtToken, JWT_SECRET);
		
		req.userId = decoded.userId;
		next();
	} catch (err) {
		console.log(`Error in authMiddleware: ${err}`);
		return res
			.status(403)
			.json({ message: `Unauthorized - Invalid token, Please Login.` });
	}
};

module.exports = {
	authMiddleware,
};
