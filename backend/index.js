import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import Stripe from 'stripe'
import stripePackage from "stripe";
const stripe = stripePackage(process.env.STRIPE_KEY);

// const stripe = new Stripe(process.env.STRIPE_KEY)

const app = express();
const PORT = process.env.PORT || 5005;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {});

app.listen(PORT, () => {
  console.log("***************************************");
  console.log(`Server Running on port number : ${PORT}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGO_DB Connection successfull...!!");
  console.log("***************************************");
});

//sajindu
import SmardCardRouter from "./routes/smartCard.js";
app.use("/smartcard", SmardCardRouter);

//sithanga
import userRouter from "./routes/userRoutes.js";
app.use("/user", userRouter);

import topUpRouter from "./routes/topUpRouter.js";
app.use("/topup", topUpRouter);

import AdminLoginRouter from "./routes/AdminLogin-Routes.js";
app.use("/admin", AdminLoginRouter);

import reservationRoutes from "./routes/reservationRoutes.js";
app.use("/reservations", reservationRoutes);

import reservationCancelRoutes from "./routes/reservationCancelRoutes.js";
app.use("/reservation-cancels", reservationCancelRoutes);

import JourneyRoutes from "./routes/JourneyRoutes.js";
app.use("/journey", JourneyRoutes);

app.post("/payment", async (req, res) => {
  let { amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "LKR",
      description: "CITYLINK",
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});
