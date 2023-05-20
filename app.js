require("dotenv").config();
require("express-async-errors");

const port = process.env.PORT || 3000;
//express
const express = require("express");
const app = express();

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

//cookie
const cookieParser = require("cookie-parser");

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

//middlewares
app.use(
  express.json(
    express.urlencoded({
      extended: true,
    })
  )
);
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: [
      `http://localhost:3000`,
      "https://localhost:3000",
      process.env.REACT_APP_URL,
    ],
    credentials: true,
  })
);
app.use(xss());

//routes
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>Inventory API</h1><a href='/api-docs'>Documentation</a> ");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
