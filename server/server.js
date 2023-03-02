const express = require("express");
require("dotenv").config();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/connect");
const errorMiddleware = require("./middlewares/error-handler");

const app = express();

const authRouter = require("./routes/authRoutes");
const productsRouter = require("./routes/productNcartRoutes");

app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error, "from server js");
  }
};

start();
