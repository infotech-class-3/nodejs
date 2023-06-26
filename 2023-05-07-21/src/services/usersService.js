const Users = require("../models/Users.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = ({ username, password, name, surname } = req.body);
  try {
    const data = await Users.create(user);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "User could not created.." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const data = await Users.findOne({ username }).exec();
  if (!data) {
    return res.status(404).json({ message: "User cannot be found.." });
  }

  const isValidated = await data.validatePassword(password);

  if (!isValidated) {
    return res.status(403).json({ message: "The password is incorrect." });
  }

  const user = {
    id: data._id,
    username: data.username,
    name: data.name,
    surname: data.surname,
  };

  const accessToken = jwt.sign(
    user,
    process.env.ACCESS_TOKEN || "cok_gizli_sifre_1234"
  );

  res.status(200).json({ ...user, token: accessToken });
};

const find = async (req, res) => {
  console.log("here");
  const id = req.params.id;
  try {
    const data = await Users.findOne({ _id: id }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "User cannot be found." });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Users.find().exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Users cannot be found." });
  }
};

const update = async (req, res) => {
  const user = ({ id, username, name, surname } = req.body);

  try {
    const data = await Users.updateOne({ _id: user.id }, { $set: user }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "User cannot be updated." });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Users.deleteOne({ _id: id }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "User cannot be deleted." });
  }
};

const checkUserByToken = async (req, res) => {
  const headerAuth = req.headers["authorization"];
  if (!headerAuth) {
    return res.status(403).json({ message: "No token data." });
  }

  const token = headerAuth.split(" ")[1];

  const user = jwt.decode(token);

  res.json({ ...user, token });
};

module.exports = {
  register,
  login,
  find,
  findAll,
  update,
  remove,
  checkUserByToken,
};
