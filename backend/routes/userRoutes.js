import express from 'express'
import { Register, Login, tokenRefresh, updateUserSmartCard } from '../controllers/userController.js'

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/tokenRefresh", tokenRefresh);
router.post("/updateSmrtCard", updateUserSmartCard);


export default router;