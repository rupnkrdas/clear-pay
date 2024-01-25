const mongoose = require("mongoose");
const { Account } = require("../models/account");

const handleGetBalance = async (req, res) => {
	const userAccount = await Account.findOne({
		userId: req.userId,
	});

	if (!userAccount)
		return res.status(404).json({
			message: `User not found.`,
		});

	return res.status(200).json({ balance: userAccount.balance });
};

const handleTranferFunds = async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	const { transferAmount, toUserId } = req.body;

	if (!transferAmount || !toUserId || transferAmount <= 0)
		return res.status(402).json({ message: `Invalid request.` });

	const fromAccount = await Account.findOne({ userId: req.userId }).session(
		session
	);

	if (!fromAccount || fromAccount.balance < transferAmount) {
		session.abortTransaction();
		return res.status(400).json({ message: `Insufficient balance.` });
	}

	const toAccount = await Account.findOne({ userId: toUserId }).session(
		session
	);

	if (!toAccount) {
		session.abortTransaction();
		return res.status(400).json({
			message: `Invalid account.`,
		});
	}

	// Perform the transfer
	await Account.updateOne(
		{ userId: req.userId },
		{
			$inc: {
				balance: -transferAmount,
			},
		}
	).session(session);
	await Account.updateOne(
		{ userId: toUserId },
		{
			$inc: {
				balance: transferAmount,
			},
		}
	).session(session);

	// commit the transaction
	await session.commitTransaction();

	return res.status(200).json({
		message: `Transaction successful.`,
	});
};

module.exports = {
	handleGetBalance,
	handleTranferFunds,
};
