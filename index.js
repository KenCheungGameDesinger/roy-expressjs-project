// framework
import express from "express";
import mongoose from "mongoose";

// middlewares
import dotenv from "dotenv";

// routes
import cartsRoute from "./routes/carts.js";

dotenv.config();

const app = express();
const port = 8080;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// middlewares
app.use(express.json());

// routes
app.use("/api/public/v1/carts", cartsRoute);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  connect();
});
