// reservationCancelController.js
import ReservationCancel from "../models/reservationCancel.js";
import Reservation from "../models/reservation.js";

export const createReservationCancel = async (req, res) => {
  try {
    const { reservationId, state, reason } = req.body;

    const reservationCancel = new ReservationCancel({
      reservationId,
      state,
      reason,
    });

    const savedReservationCancel = await reservationCancel.save();

    // Update the state of the associated reservation if rejected
    if (state === "rejected") {
      await Reservation.findByIdAndUpdate(reservationId, {
        status: "deactive",
      });
    }

    res.status(201).json(savedReservationCancel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getReservationCancels = async (req, res) => {
  try {
    const reservationCancels = await ReservationCancel.find();
    res.status(200).json(reservationCancels);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getReservationCancelById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservationCancel = await ReservationCancel.findById(id);

    if (!reservationCancel) {
      return res.status(404).json({ message: "Reservation Cancel not found" });
    }

    res.status(200).json(reservationCancel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateReservationCancel = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;

    // Update the state of the associated reservation if rejected
    if (state === "rejected") {
      await Reservation.findByIdAndUpdate(reservationCancel.reservationId, {
        status: "deactive",
      });
    }

    const updatedReservationCancel = await ReservationCancel.findByIdAndUpdate(
      id,
      {
        state,
      }
    );
    res.status(200).json(updatedReservationCancel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const deleteReservationCancel = async (req, res) => {
  try {
    const { id } = req.params;
    const reservationCancel = await ReservationCancel.findById(id);

    if (!reservationCancel) {
      return res.status(404).json({ message: "Reservation Cancel not found" });
    }

    await ReservationCancel.findOneAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
