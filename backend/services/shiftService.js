import { apiError } from "../lib/apiError.js";
import { Shift } from "../models/shift.js";
import { shiftValidations } from "../zod/shifts.js";
import mongoose from "mongoose";

const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};


export const addShiftService = async(input) =>{

    const result = shiftValidations.safeParse(input);

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

}


export const getShiftsService = async(q) =>{
    
    const shifts = await Shift.find(q).populate("employeeId","name").sort({date:1,startTime:1})

    return shifts;
}


export const getMyShiftService = async (employeeId) =>{

    const today = new Date().toISOString().slice(0, 10);

    const shift = await Shift.findOne({
        employeeId: new mongoose.Types.ObjectId(employeeId),
        date: { $gte: today }
});

    return shift;
}


export const deleteShiftService = async (id)=>{

    const deleted = await Shift.findByIdAndDelete(id);

      if(!deleted){
        throw new apiError(404,"Shift Not Found")
      }

}