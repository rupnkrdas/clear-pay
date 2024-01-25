const express = require("express");
const { connectToMongoDB } = require("./db/connection");
require("dotenv").config();
const v1Router = require("./routes");
const cors = require("cors");

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

const app = express();

// connect to database
connectToMongoDB(MONGO_URI);

app.use(express.json());
// Allow requests only from your client-side application
const allowedOrigins = ["https://payments-app-client.vercel.app"];
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
	})
);

app.use("/api/v1", v1Router);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
