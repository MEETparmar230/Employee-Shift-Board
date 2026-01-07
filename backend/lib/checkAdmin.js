import { apiError } from "./apiError.js"

export const isAdmin = (req,res,next) =>{

    if(req.user.role !== "admin"){
        throw new apiError(403,"Not Authenticated")
    }
    next()
}