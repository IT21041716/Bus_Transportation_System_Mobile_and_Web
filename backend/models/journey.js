// reservation.js in models directory
import mongoose from "mongoose";

const journeySchema = new mongoose.Schema({
  createdBy: {
    type: String,
    ref: "user",
    required: true,
  },
  reservedDate: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "active",
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Journey = mongoose.model("Journey", journeySchema);

export default Journey;
