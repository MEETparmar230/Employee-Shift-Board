import { Router } from "express"
import { authCheck } from "../lib/authMiddleware.js"
import { addEmployee, getEmployees } from "../controllers/adminController.js"

const router = Router()

router.post("/addemployee",authCheck,addEmployee)
router.get("/getEmployees",authCheck,getEmployees)

export default router