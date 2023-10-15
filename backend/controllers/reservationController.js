// reservationController.js
import Reservation from "../models/reservation.js";

export const createReservation = async (req, res) => {
  try {
    const { createdBy, reservedDate, reservedTo } = req.body;

    const reservation = new Reservation({
      createdBy,
      reservedDate,
      reservedTo,
    });

    const savedReservation = await reservation.save();

    res.status(201).json(savedReservation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Reservation.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );
    res.status(201).json({ message: "succes" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    await Reservation.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
