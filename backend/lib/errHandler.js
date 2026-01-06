import { apiError } from "./apiError.js"

export const errorHandler = (err,req,res,next) => {
    console.log(err)
    if(err instanceof apiError){    
        res.status(err.code).json({
        success:false,
        status:err.code,
        message:err.message
    })}
    else{
        res.status(500).json({
            success:false,
            status:500,
            message:"Something went Wrong"
        })
    }
}