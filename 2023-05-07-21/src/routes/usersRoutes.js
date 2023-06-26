const express = require("express");
const router = express.Router();
const {
  register,
  login,
  find,
  findAll,
  update,
  remove,
  checkUserByToken,
} = require("../services/usersService.js");
const auth = require("../middlewares/auth.js");
const logger = require("../middlewares/logger.js");

router.post("/register", register);
router.post("/login", login);
router.get("/:id", find);
router.get("/", auth, logger, logger, logger, findAll); // secure
router.patch("/", update);
router.delete("/:id", auth, remove); // secure
router.get("/check/me", checkUserByToken);

// rest API
/**
 * CRUD
 * Create
 * Read
 * Update
 * Delete
 *
 */

module.exports = router;
