import express from "express";
import {
  AdminRegister,
  Signin,
  Signout,
  tokenRefresh,
} from "../controllers/Admin-Controller.js";

const router = express.Router();

router.post("/adminSignup", AdminRegister);
router.post("/adminSignin", Signin);
router.delete("/adminSignout", Signout);
router.post("/Token", tokenRefresh);

export default router;
