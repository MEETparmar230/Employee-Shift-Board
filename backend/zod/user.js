import * as z from "zod";
 
export const userValidations = z.object({
  email: z.email().min(1,{message:"Email is Required"}),
  password : z.string().min(1,{messsage:"Password is required"}),
  role : z.literal(["admin","user"]).default("user"),
  employeeId: z.string().optional()

});
 
