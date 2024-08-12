const mongoose = require("mongoose");

async function dbInitialization() {
  try {
    const dbURI =
      "mongodb+srv://divyanshkapoor23:Rambo00.123@testingapi.voa6tzx.mongodb.net/?retryWrites=true&w=majority&appName=TestingAPI";
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(dbURI, options);
    console.log("Connected to MongoDB");

    // Handle MongoDB connection errors
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

dbInitialization();

module.exports = mongoose.connection;
