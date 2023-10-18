import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  UID: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
});

export default mongoose.model("trip", tripSchema);
