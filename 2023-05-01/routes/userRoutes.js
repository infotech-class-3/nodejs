const express = require("express");
const router = express.Router();
const data = require("../data/users.js");

router.get("/", (req, res) => {
  res.send(data);
});

router.get("/:id", (req, res) => {
  const requestId = req.params.id;
  res.json(data.filter((user) => user.id === Number(requestId)));
});

router.get("/search", (req, res) => {
  console.log("search", req.query);
  const requestId = req.query.userId;
  res.json(data.filter((user) => user.id === Number(requestId)));
});

router.post("/", (req, res) => {
  console.log("search", req.body);
  const requestId = req.body.userId;
  res.json(data.filter((user) => user.id === Number(requestId)));
});

router.post("/adduser", (req, res) => {
  const newUser = req.body;
  data.push(newUser);
  res.json(data);
});

router.put("/", (req, res) => {
  res.send("put istegi alindi...");
});

router.delete("/:id", (req, res) => {
  res.json(data.filter((user) => user.id !== Number(req.params.id)));
});

module.exports = router;
