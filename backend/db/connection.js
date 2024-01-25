const mongoose = require("mongoose");

const connectToMongoDB = async (uri) => {
	try {
		await mongoose.connect(uri);
		console.log(`Connected to MongoDB successfully!`);
	} catch (err) {
		console.log(`Error connecting to MongoDB, ${err}`);
	}
};

module.exports = {
	connectToMongoDB,
};
