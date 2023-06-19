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
  res
    .status(StatusCodes.OK)
    .json({ msg: `updated user with id ${req.params.id}` });
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
const updatePassword = async (req, res) => {
  let { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError.NotFoundError(`No user with id : ${userId}`);
    }
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      throw new CustomError.BadRequestError("Invalid current password");
    }

    if (newPassword !== confirmPassword) {
      throw new CustomError.BadRequestError(
        "New password and confirm password do not match"
      );
    }

    user.password = newPassword;
    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ msg: `Password updated for user with id ${userId}` });
  } catch (error) {
    // Handle any errors
    console.error(error);
    if (error.statusCode === 400) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid password" });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updatePassword,
};
