// reservationCancelRoutes.js
import express from "express";
import {
  createReservationCancel,
  getReservationCancels,
  getReservationCancelById,
  updateReservationCancel,
  deleteReservationCancel,
} from "../controllers/reservationCancelController.js";

const router = express.Router();

// Create a reservation cancel
router.post("/", createReservationCancel);

// Get all reservation cancels
router.get("/", getReservationCancels);

// Get a reservation cancel by ID
router.get("/:id", getReservationCancelById);

// Update a reservation cancel by ID
router.put("/:id", updateReservationCancel);

// Delete a reservation cancel by ID
router.delete("/:id", deleteReservationCancel);

export default router;
