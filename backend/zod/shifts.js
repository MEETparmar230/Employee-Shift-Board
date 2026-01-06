import * as z from "zod";
 
export const shiftValidations = z.object({
  employeeId: z.string().min(1),
  date : z.iso.date().min(1),
  startTime : z.string().min(1),
  endTime: z.string().min(1)

});
 
