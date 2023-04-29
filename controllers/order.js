const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json(orders);
};
const getSingleOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json(order);
};
const createOrder = async (req, res) => {
  // console.log(req.body);
  const { items: cartItems } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }
  let orderItems = [];
  let total = 0;
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.productId });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.productId}`
      );
    }
    console.log(dbProduct);
    const { name, price, image, _id, quantity } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      quantity,
      productID: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    total += item.amount * price;
  }
  const order = await Order.create({
    orderItems,
    total,
    customerID: req.body.customerId,
  });
  res.status(StatusCodes.CREATED).json({ order });
};
module.exports = { getAllOrders, getSingleOrder, createOrder };
