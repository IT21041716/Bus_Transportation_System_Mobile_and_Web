// JourneyRoutes.js
import express from "express";
import {
  createJourney,
  getJourneys,
  getJourneyById,
  updateJourney,
  deleteJourney,
  getJourneyByUserId,
  deleteAllJourneys
} from "../controllers/JourneyController.js";

const router = express.Router();

// Create a Journey
router.post("/", createJourney);

// Get all Journeys
router.get("/", getJourneys);

router.get("/user/:id", getJourneyByUserId);

// Get a Journey by ID
router.get("/:id", getJourneyById);

// Update a Journey by ID
router.put("/:id", updateJourney);

// Delete a Journey by ID
router.delete("/:id", deleteJourney);
router.delete("/", deleteAllJourneys); // Add this route

export default router;
