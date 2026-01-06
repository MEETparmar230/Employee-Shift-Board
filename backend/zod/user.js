import * as z from "zod";
 
export const userValidations = z.object({
  email: z.email(),
  password : z.string(),
  role : z.literal(["admin","user"]).default("user"),
  employeeId: z.string()

});
 
