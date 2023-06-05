const Product = require("../models/Product");
const Order = require("../models/Order");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getLowQuantityProducts = async (req, res) => {
  const products = await Product.find().sort({ quantity: 1 });
  res.status(StatusCodes.OK).json(products);
};
const getMostSoldProducts = async (req, res) => {
  const products = await Product.find().sort({ soldQuantity: -1 });
  res.status(StatusCodes.OK).json(products);
};

module.exports = { getLowQuantityProducts, getMostSoldProducts };
