import express from "express";
import {
  addSmartCard,
  deleteSmartCard,
  getAllSmartCards,
  getOneSmartCard,
  updateSmartCard
} from "../controllers/smartCard.js";
const router = express.Router();

router.post("/add", addSmartCard);
router.get("/all", getAllSmartCards);
router.get("/one/:id", getOneSmartCard);
router.put("/update/:id", updateSmartCard);
router.delete("/delete/:id", deleteSmartCard);

export default router;
