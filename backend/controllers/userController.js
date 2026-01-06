import { userValidations } from "../zod/user.js";
import User from '../models/user.js'
import { v4 as uuidv4 } from 'uuid';
import { apiError } from '../lib/apiError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Employee } from "../models/employee.js";

export const login = async (req, res, next) => {

    const secret = process.env.JWT_SECRET;
    const body =  req.body;
    try {
        if (!body.email || !body.password) {
            throw new apiError(401, "invalid credentials")
        }

        const user = await User.findOne({email:body.email});

        

        if(!user){
            throw new apiError(404,"User not found")
        }

        const valid =await bcrypt.compare(body.password,user.password);


        if(!valid){
            throw new apiError(401,"Invalid Password or Email")
        }

        const token = await jwt.sign({id:user._id, role:user.role, employeeId:user.employeeId},secret,{expiresIn:"1h"});

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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new apiError(400, "Invalid credentials");
    }


    const employee = await Employee.create({
      name,
      employeeCode: Math.floor(Math.random() * 100000),
      department: "General"
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create User with employee._id
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "user",
      employeeId: employee._id
    });

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