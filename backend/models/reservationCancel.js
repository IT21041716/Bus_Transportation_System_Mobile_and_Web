// reservationCancel.js in models directory
import mongoose from "mongoose";

const reservationCancelSchema = new mongoose.Schema({
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation", // Assuming Reservation is the name of your reservation model
    required: true,
  },
  state: {
    type: String,
    enum: ["accepted", "pending", "rejected"],
    required: false,
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ReservationCancel = mongoose.model(
  "ReservationCancel",
  reservationCancelSchema
);

export default ReservationCancel;
