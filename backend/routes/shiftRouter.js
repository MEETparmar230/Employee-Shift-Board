import { Router } from "express"
import { authCheck } from "../lib/authMiddleware.js"
import { addShift, deleteShift, getMyShift, getShifts ,getMy} from "../controllers/shiftController.js"

const router = Router()

router.post("/createShift",authCheck,addShift)
router.get("/getShifts",authCheck,getShifts)
router.delete("/delete/:id",authCheck,deleteShift)
router.get("/getShift",authCheck,getMyShift)
router.get("/getMy" , authCheck, getMy)

export default router