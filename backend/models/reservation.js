// reservation.js in models directory
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  reservedTo: {
    type: String,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
