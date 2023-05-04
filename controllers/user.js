const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.status(StatusCodes.OK).json({ user });
};
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete({ _id: req.params.id });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `User  with id : ${req.params.id} deleted` });
};

module.exports = { getAllUsers, getSingleUser, updateUser, deleteUser };
