require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongo = require("./db.js");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const memberRoutes= require("./routes/member");

// database connection
mongo.on("error", console.error.bind(console, "MongoDB connection error:"));

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api",memberRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));