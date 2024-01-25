const express = require("express");
const {
	handleUserSignup,
	handleUserSignin,
	handleUpdateUserInfo,
	handleGetUsers,
	handleGetUser,
} = require("../controllers/user");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST SIGNUP
router.post("/signup", handleUserSignup);
// POST SIGNIN
router.post("/signin", handleUserSignin);
// GET user
router.get("/", authMiddleware, handleGetUser);
// PATCH password/firstName/lastName
router.patch("/", authMiddleware, handleUpdateUserInfo);
// GET users
router.get("/bulk", authMiddleware, handleGetUsers);

module.exports = router;
