import { Router } from "express"
import { authCheck } from "../lib/authMiddleware.js"
import { addShift, deleteShift, getShifts ,getMy} from "../controllers/shiftController.js"
import { isAdmin } from "../lib/checkAdmin.js"

const router = Router()

router.post("/createShift",authCheck,isAdmin,addShift)
router.get("/getShifts",authCheck,isAdmin,getShifts)
router.delete("/delete/:id",authCheck,isAdmin,deleteShift)
router.get("/getMy" , authCheck, getMy)

export default router