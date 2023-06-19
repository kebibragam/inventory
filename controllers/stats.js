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
const getExpiryProducts = async (req, res) => {
  const products = await Product.find().sort({ expiryDate: 1 });
  res.status(StatusCodes.OK).json(products);
};
const getSalesAndProfitAmount = async (req, res) => {
  try {
    const orders = await Order.find();
    let totalSales = 0;
    let totalProfit = 0;
    let dailySales = 0;
    let dailyProfit = 0;
    let weeklySales = 0;
    let weeklyProfit = 0;
    let monthlySales = 0;
    let monthlyProfit = 0;
    let quarterlySales = 0;
    let quarterlyProfit = 0;
    let yearlySales = 0;
    let yearlyProfit = 0;

    for (const order of orders) {
      totalSales += order.total;
      totalProfit += order.profitAmount;

      const orderDate = new Date(order.createdAt);
      const currentDate = new Date();

      // Calculate daily sales and profit
      if (
        orderDate.toISOString().slice(0, 10) ===
        currentDate.toISOString().slice(0, 10)
      ) {
        dailySales += order.total;
        dailyProfit += order.profitAmount;
      }

      // Calculate weekly sales and profit
      const weekStartDate = new Date();
      weekStartDate.setDate(weekStartDate.getDate() - 7);
      if (orderDate >= weekStartDate && orderDate <= currentDate) {
        weeklySales += order.total;
        weeklyProfit += order.profitAmount;
      }

      // Calculate monthly sales and profit
      const monthStartDate = new Date();
      monthStartDate.setMonth(monthStartDate.getMonth() - 1);
      if (orderDate >= monthStartDate && orderDate <= currentDate) {
        monthlySales += order.total;
        monthlyProfit += order.profitAmount;
      }

      // Calculate quarterly sales and profit
      const quarterStartDate = new Date();
      quarterStartDate.setMonth(quarterStartDate.getMonth() - 3);
      if (orderDate >= quarterStartDate && orderDate <= currentDate) {
        quarterlySales += order.total;
        quarterlyProfit += order.profitAmount;
      }

      // Calculate yearly sales and profit
      const yearStartDate = new Date();
      yearStartDate.setFullYear(yearStartDate.getFullYear() - 1);
      if (orderDate >= yearStartDate && orderDate <= currentDate) {
        yearlySales += order.total;
        yearlyProfit += order.profitAmount;
      }
    }

    res.status(StatusCodes.OK).json({
      dailySales: dailySales,
      dailyProfit: dailyProfit,
      weeklySales: weeklySales,
      weeklyProfit: weeklyProfit,
      monthlySales: monthlySales,
      monthlyProfit: monthlyProfit,
      quarterlySales: quarterlySales,
      quarterlyProfit: quarterlyProfit,
      yearlySales: yearlySales,
      yearlyProfit: yearlyProfit,
      totalSales: totalSales,
      totalProfit: totalProfit,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
const weeklySalesData = async (req, res) => {
  try {
    const currentDate = new Date();

    const weekStartDate = new Date(currentDate);
    weekStartDate.setDate(currentDate.getDate() - 6); // Subtract 6 days to get the start date for the latest 7 days

    const orders = await Order.find({
      createdAt: { $gte: weekStartDate, $lte: currentDate },
    });

    let salesByDay = {};

    for (const order of orders) {
      const orderDate = new Date(order.createdAt);

      const dayOfWeek = orderDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const date = orderDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const key = `${dayOfWeek}, ${date}`;

      if (salesByDay[key]) {
        salesByDay[key] += order.total;
      } else {
        salesByDay[key] = order.total;
      }
    }

    // Sort the salesByDay object by date in ascending order
    const sortedSalesByDay = Object.fromEntries(
      Object.entries(salesByDay).sort(([keyA], [keyB]) => {
        const dateA = new Date(keyA.split(", ")[1]);
        const dateB = new Date(keyB.split(", ")[1]);
        return dateA - dateB;
      })
    );

    res.status(StatusCodes.OK).json({ salesByDay: sortedSalesByDay });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports = {
  getLowQuantityProducts,
  getMostSoldProducts,
  getExpiryProducts,
  getSalesAndProfitAmount,
  weeklySalesData,
};
