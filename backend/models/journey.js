// reservation.js in models directory
import mongoose from "mongoose";

const journeySchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  reservedDate: {
    type: Date,
    required: true,
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
