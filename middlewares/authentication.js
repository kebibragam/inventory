// const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CustomError = require("../errors");

const { UnauthenticatedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
  //check header
  // const authHeader = req.headers.authorization;
  // console.log(authHeader);

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   throw new UnauthenticatedError("Authentication invalid");
  // }

  // const token = authHeader.split(" ")[1];
  const token = req.cookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user);
    // console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      // console.log(req.user.role);
      throw new CustomError.UnauthenticatedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
