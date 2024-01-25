const express = require("express");
const {
	handleGetBalance,
	handleTranferFunds,
} = require("../controllers/account");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// GET Balance
router.get("/balance", authMiddleware, handleGetBalance);

// POST transfer funds
router.post("/transfer", authMiddleware, handleTranferFunds);

module.exports = router;
