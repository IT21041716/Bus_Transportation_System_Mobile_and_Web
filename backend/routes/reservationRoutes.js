// reservationRoutes.js
import express from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

// Create a reservation
router.post("/", createReservation);

// Get all reservations
router.get("/", getReservations);

// Get a reservation by ID
router.get("/:id", getReservationById);

// Update a reservation by ID
router.put("/:id", updateReservation);

// Delete a reservation by ID
router.delete("/:id", deleteReservation);

export default router;
