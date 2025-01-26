const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute.js");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express server" });
});

module.exports = app;
