const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");

const PORT = 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda calisiyor...`);
});
