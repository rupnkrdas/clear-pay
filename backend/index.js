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

app.use(cors());
app.use(express.json());

app.use("/api/v1", v1Router);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
