const Todos = require("../models/Todo.js");

const create = async (req, res) => {
  try {
    const todo = req.body;
    const data = await Todos.create(todo);
    return res.json(data);
  } catch (error) {
    throw res
      .status(403)
      .json({ message: "Todo could not be created.", error });
  }
};

const find = async (req, res) => {
  try {
    const todoId = req.params.id;
    const data = await Todos.findOne({ _id: todoId }).exec();
    return res.json(data);
  } catch (error) {
    throw res.status(404).json({ message: "Todo could not be found.", error });
  }
};

const findAll = async (req, res) => {
  try {
    const { userId } = req.body;
    const data = await Todos.find({ userId: userId }).exec();
    return res.json(data);
  } catch (error) {
    throw res.status(404).json({ message: "Todos could not be found.", error });
  }
};

const update = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = req.body;
    todo.updatedDate = Date.now();
    const data = await Todos.updateOne({ _id: todoId }, { $set: todo }).exec();
    return res.json(data);
  } catch (error) {
    throw res
      .status(404)
      .json({ message: "Todos could not be updated.", error });
  }
};

const remove = async (req, res) => {
  try {
    const todoId = req.params.id;
    const data = await Todos.deleteOne({ _id: todoId }).exec();
    return res.json(data);
  } catch (error) {
    throw res
      .status(404)
      .json({ message: "Todos could not be deleted.", error });
  }
};

module.exports = { create, find, findAll, update, remove };
