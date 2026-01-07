import { loginService, signUpService } from "../services/userServices.js";


export const login = async (req, res, next) => {

    try {

      const token = await loginService(req.body)

        res.cookie("token",token,{
            httpOnly:true,
            })

        res.status(200).json({
            success:true,
            status:200,
            message:"Login Successfull"
        })
    }
    catch (err) {
        next(err);
    }

}

export const Signup = async (req, res, next) => {
  try {

    await signUpService(req.body)

    res.status(201).json({
      success: true,
      message: "User Created Successfully"
    });

  } catch (err) {
    next(err);
  }
};


export const me = (req,res,next)=>{
    try{
        res.json({
            loggedIn:true,
            role:req.user.role,
        })
    }
    catch(err){
        next(err)
    }
}

export const logOut = (req,res,next) =>{

    try{
    res.clearCookie("token",{
        httpOnly:true,
        path:"/"
    });

    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
}
catch(err){
    next(err)
}
}