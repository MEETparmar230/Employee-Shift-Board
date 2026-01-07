import { apiError } from "../lib/apiError.js";
import { addShiftService, deleteShiftService, getMyShiftService, getShiftsService } from "../services/shiftService.js";





export const addShift = async (req,res,next) =>{

    try{

      await addShiftService(req.body)

        res.status(201).json({
            success:true,
            message:"Shift Assigned"
        })

    }
    catch(err){
        next(err)
    }
    
}

export const getShifts =async (req,res,next) => {
    try {

     const q = {};
     if (req.user.role === "admin") {
      if (req.query.date) {
        q.date = req.query.date;
      }
    }
     else {
      q.employeeId = req.user.employeeId;
    }      
      const shifts = await getShiftsService(q)

        res.status(200).json({
            success:true,
            shifts
        })

    } catch (err) {
        next(err)
    }
}

export const getMy = async (req, res, next) => {
  try {

    if (req.user.role !== "user") {
      throw new apiError(403,"Not authorized")
    }

    const shift = await getMyShiftService(req.user.employeeId);

    res.status(200).json({
      success: true,
      shift: shift || null,
    });

  } catch (err) {
    next(err);
  }
};

export const deleteShift =async (req,res,next) =>{
    try {

      const {id} = req.params;

     await deleteShiftService(id)

      res.status(200).json({
            success:true,
            message:"Shift Deleted"
      })
    }
    catch (err) {
        next(err)
    }
}