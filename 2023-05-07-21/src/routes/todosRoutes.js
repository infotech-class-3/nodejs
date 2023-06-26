const express = require("express");
const auth = require("../middlewares/auth.js");
const {
  create,
  find,
  findAll,
  update,
  remove,
} = require("../services/todosService.js");

const router = express.Router();

router.get("/:id", find); // localhost:4000/todos/6457ac90127c62460a34c6d2

router.post("/findall", findAll); // localhost:4000/todos/findall
router.post("/create", create); // localhost:4000/todos/create
router.patch("/:id/update", update); // localhost:4000/todos/6457ac90127c62460a34c6d2/update
router.delete("/:id/delete", auth, remove); // localhost:4000/todos/6457ac90127c62460a34c6d2/delete

module.exports = router;
