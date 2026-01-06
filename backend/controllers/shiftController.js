import { success } from "zod";
import { apiError } from "../lib/apiError.js";
import { Shift } from "../models/shift.js";
import { shiftValidations } from "../zod/shifts.js";


const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const addShift = async (req,res,next) =>{

    try{
        if(req.user.role !="admin"){
            throw new apiError(403,"Not Authorised")
        }

        const body = req.body;

        const result = shiftValidations.safeParse(body);

        if(!result.success){
            console.log("Data is not Correct")
            throw new apiError(401,"Invalid input")
        }


        const { employeeId, date, startTime, endTime } = result.data

        const start = timeToMinutes(startTime)
        const end = timeToMinutes(endTime)


        if(end-start < 240){
            throw new apiError(400,"Shift must be at least 4 hours")
        }

        const existingShifts = await Shift.find({employeeId,date})

        for(const shift of existingShifts){
            const existingStart = timeToMinutes(shift.startTime);
            const existingEnd = timeToMinutes(shift.endTime)

            const overlap = start < existingEnd && end > existingStart;


            if(overlap){
                throw new apiError(400,"Shift Overlaps with existing shift")
            }
        }

         await Shift.create({employeeId,date,startTime,endTime})

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


        const shifts = await Shift.find(q).populate("employeeId","name").sort({date:1,startTime:1})

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
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const shift = await Shift.findOne({
      employeeId: req.user.employeeId,
      date: { $gte: new Date().toISOString().slice(0, 10) }
    })
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      shift: shift || null,
    });

  } catch (err) {
    next(err);
  }
};


export const getMyShift = async (req, res, next) => {
  try {
        if(req.user.role !="user"){
            throw new apiError(403,"Not Authorised")
        }

    const today = new Date().toISOString().split("T")[0];

    const shift = await Shift.findOne({
      employeeId: req.user.employeeId,
      date: { $gte: today }
    })
      .populate("employeeId", "name")
      .sort({ date: 1, startTime: 1 });

      console.log(shift)

    res.status(200).json({
      success: true,
      shift: shift || null
    });

  } catch (err) {
    next(err);
  }
};

export const deleteShift =async (req,res,next) =>{
    try {

        if(req.user.role !="admin"){
            throw new apiError(403,"Not Authorised")
        }

      const {id} = req.params;

      const deleted = await Shift.findByIdAndDelete(id);

      if(!deleted){
        throw new apiError(404,"Shift Not Found")
      }

      res.status(200).json({
            success:true,
            message:"Shift Deleted"
      })
      

    }
    catch (err) {
        next(err)
    }
}