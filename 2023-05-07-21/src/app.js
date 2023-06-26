const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const usersRoutes = require("./routes/usersRoutes.js");
const todosRoutes = require("./routes/todosRoutes.js");
const mongoose = require("mongoose");
const cors = require("cors");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// db Config Section
const db = process.env.MongoURI || "mongodb://localhost:27017/course_db";

console.log(db);
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Db connected"))
  .catch((err) => console.log(err));

app.use("/users", usersRoutes);
app.use("/todos", todosRoutes);

app.listen(PORT, console.log(`Server is running at PORT:${PORT}`));
