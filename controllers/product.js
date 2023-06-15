const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};
const getProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findByIdAndDelete({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
