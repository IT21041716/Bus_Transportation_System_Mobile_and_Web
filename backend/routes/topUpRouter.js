import express from "express";
import { newTopup, topUpByUser, checkBalance, deductBalance, claimUpdateBalance } from '../controllers/topUpController.js'

const router = express.Router();

router.post("/insert", newTopup);
router.post("/get", topUpByUser);
router.post("/check", checkBalance);
router.post("/deduct", deductBalance);
router.post("/claimUpdate", claimUpdateBalance);


export default router;