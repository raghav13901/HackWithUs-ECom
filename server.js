require("dotenv").config({ path: "./config.env" });
const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
connectDB();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Api running");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/home", require("./routes/home"));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});