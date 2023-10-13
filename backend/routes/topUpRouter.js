import express from "express";
import { newTopup, topUpByUser, checkBalance, deductBalance } from '../controllers/topUpController.js'

const router = express.Router();

router.post("/insert", newTopup);
router.post("/get", topUpByUser);
router.post("/check", checkBalance);
router.post("/deduct", deductBalance);


export default router;