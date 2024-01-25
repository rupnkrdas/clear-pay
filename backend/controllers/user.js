const { Account } = require("../models/account");
const { User } = require("../models/user");
const { userZodSchema } = require("../models/zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const z = require("zod");

const handleUserSignup = async (req, res) => {
	const { firstName, lastName, username, password } = req.body;
	if (!firstName || !lastName || !username || !password)
		return res
			.status(400)
			.json({ message: `All the fields are required.` });

	const validated = userZodSchema.safeParse({
		firstName,
		lastName,
		username,
		password,
	});

	// console.log(validated);
	if (!validated.success) {
		return res.status(411).json({
			message: `Incorrect inputs.`,
		});
	}

	const userExists = await User.findOne({ username: req.body.username });
	if (userExists) {
		return res.status(411).json({
			message: `Email already taken.`,
		});
	}

	const newUser = await User.create({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
	});

	const userId = newUser._id;

	/**
	 * Create a new account
	 */
	await Account.create({
		userId,
		balance: Math.random() * 10000 + 1,
	});

	const jwtToken = jwt.sign({ userId }, JWT_SECRET);
	return res.status(201).json({
		message: `User created successfully.`,
		token: jwtToken,
	});
};

const handleUserSignin = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password)
		return res
			.status(400)
			.json({ message: `All the fields are required.` });

	const zodSchema = z.object({
		username: z.string().email(),
		password: z.string().min(6),
	});
	try {
		const validated = zodSchema.safeParse(req.body);
		console.log(validated.error);
		if (!validated.success) {
			return res.status(411).json({
				message: `Invalid email or password. Please try again.`,
			});
		}

		// console.log(`Req body: ${req.body}`);

		const usernameExists = await User.findOne({
			username: req.body.username,
		});

		// console.log(usernameExists);

		if (!usernameExists)
			return res.status(404).json({
				message: "Not Found: Username doesn't exist. Please sign up.",
			});
		if (req.body.password !== usernameExists.password)
			return res
				.status(401)
				.json({ message: "Unauthorized: Password is incorrect." });

		const userId = usernameExists._id;
		const jwtToken = jwt.sign({ userId }, JWT_SECRET);
		return res.status(200).json({
			message: `User signed in successfully.`,
			token: jwtToken,
		});
	} catch (err) {
		console.log(`Error in handleUserSignin: ${err}`);
		return res.json({ Error: `${err}` });
	}
};

const handleGetUser = async (req, res) => {
	const userId = req.userId;

	const user = await User.findOne({ _id: userId });

	if (!user) return res.status(404).json({ message: "Invalid credentials." });
	return res.status(200).json({
		_id: userId,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
	});
};

const handleUpdateUserInfo = async (req, res) => {
	const { password, firstName, lastName } = req.body;

	if (!password || !firstName || !lastName)
		return res
			.status(411)
			.json({ message: `Error while updating information.` });

	if (password) {
		const passwordSchema = z.string().min(6);
		const validate = passwordSchema.safeParse(password);

		if (!validate.success)
			return res.json({ message: `${validate.error}` });

		await User.findOneAndUpdate(
			{ _id: req.userId },
			{
				password,
			}
		);

		return res.status(200).json({ message: `Updated successfully.` });
	}

	if (firstName || lastName) {
		await User.findOneAndUpdate(
			{ _id: req.userId },
			{
				firstName,
				lastName,
			}
		);
	}

	return res.status(200).json({ message: `Updated successfully.` });
};

const handleGetUsers = async (req, res) => {
	const filter = req.query.filter || "";
	const usersInDB = await User.find({
		$or: [
			{ firstName: { $regex: filter } },
			{ lastName: { $regex: filter } },
		],
	});

	return res.status(200).json({
		users: usersInDB.map((user) => ({
			_id: user._id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
		})),
	});
};

module.exports = {
	handleUserSignup,
	handleUserSignin,
	handleUpdateUserInfo,
	handleGetUsers,
	handleGetUser,
};
