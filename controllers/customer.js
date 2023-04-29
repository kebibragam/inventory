const Customer = require("../models/Customer");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(StatusCodes.CREATED).json(customer);
};

const getAllCustomers = async (req, res) => {
  const customers = await Customer.find({});
  res.status(StatusCodes.OK).json(customers);
};

const getSingleCustomers = async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id });
  res.status(StatusCodes.OK).json(customer);
};

const updateCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  if (!customer) {
    throw new CustomError.NotFoundError(
      `No customer with id : ${req.params.id}`
    );
  }
  res.status(StatusCodes.OK).json(customer);
};

const deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete({ _id: req.params.id });

  if (!customer) {
    throw new CustomError.NotFoundError(
      `No product with id : ${req.params.id}`
    );
  }

  res.status(StatusCodes.OK).json(customer);
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getSingleCustomers,
  updateCustomer,
  deleteCustomer,
};
