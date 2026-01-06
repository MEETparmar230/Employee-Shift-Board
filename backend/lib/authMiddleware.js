import { config } from "dotenv";
import { apiError } from "./apiError.js";
import jwt from 'jsonwebtoken'
config()

export const authCheck = (req,res,next) =>{

    const secret = process.env.JWT_SECRET;


    try{

        const token = req.cookies?.token;

        if(!token){
            throw new apiError(401,"Not authenticated")
        }

        const decoded = jwt.verify(token,secret);

        req.user = {
            id:decoded.id,
            role:decoded.role,
            employeeId:decoded.employeeId
        }

        next()
    }
    catch(err){
        next(err);
    }
}