import { Router } from 'express'
import {me, login, Signup, logOut } from '../controllers/userController.js'
import { authCheck } from '../lib/authMiddleware.js';

const router = Router()

router.post("/signup",Signup);
router.post("/login",login)
router.get("/me", authCheck,me),
router.post("/logout", authCheck,logOut)
 
export default router