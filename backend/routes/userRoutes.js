import express from 'express'
import { Register, Login, tokenRefresh } from '../controllers/userController.js'

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/tokenRefresh", tokenRefresh);


export default router;