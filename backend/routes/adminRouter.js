import { Router } from "express"
import { authCheck } from "../lib/authMiddleware.js"
import { addEmployee, getEmployees } from "../controllers/adminController.js"
import { isAdmin } from "../lib/checkAdmin.js"

const router = Router()

router.post("/addemployee",authCheck,isAdmin,addEmployee)
router.get("/getEmployees",authCheck,isAdmin,getEmployees)

export default router