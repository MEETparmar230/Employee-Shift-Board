import * as z from "zod";
 
export const employeeValidations = z.object({
  name: z.string().min(1),
  employeeCode : z.number(),
  department: z.string().min(1)

});
 

