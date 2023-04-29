require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

//routers
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const customerRouter = require("./routes/customer");

//error handler
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const {
  authenticateUser,
  authorizePermissions,
} = require("./middlewares/authentication");

app.set("trust poxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, // limit each Ip to 100 requests per windowMs
  })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/v1/product", productRouter);
app.use("/api/v1/auth", authRouter);
app.use(
  "/api/v1/user",
  [authenticateUser, authorizePermissions("manager")],
  userRouter
);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/customers", authenticateUser, customerRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
