const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    throw new UnauthenticatedError("Invalid Email");
  }
  //compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }

  const token = user.createJWT();
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 6 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({
    user: { name: user.name, userId: user._id, role: user.role },
    token,
  });
};

const isAuthenticated = (req, res) => {
  if (!req.cookies.token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: false });
  }
  if (jwt.verify(req.cookies.token, process.env.JWT_SECRET)) {
    const user = jwt.decode(req.cookies.token);
    return res.status(StatusCodes.OK).json({
      msg: true,
      user: { name: user.name, userId: user.userId, role: user.role },
    });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: false });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({ msg: "Logged out" });
};

module.exports = { register, login, logout, isAuthenticated };
