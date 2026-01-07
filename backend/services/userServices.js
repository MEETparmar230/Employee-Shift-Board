import User from '../models/user.js'
import { apiError } from '../lib/apiError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Employee } from "../models/employee.js";
import { userValidations } from '../zod/user.js';

export const loginService = async(input) =>{
    const secret = process.env.JWT_SECRET;

    const result = userValidations.safeParse(input)

    if(!result.success){
        console.log("Data is not Correct")
        throw new apiError(401,("Invalid input"))
    }

    const user = await User.findOne({email:result.data.email});

    if(!user){
        throw new apiError(404,"User not found")
    }

        const valid =await bcrypt.compare(result.data.password,user.password);


    if(!valid){
        throw new apiError(401,"Invalid Password or Email")
    }

    const token = await jwt.sign({id:user._id, role:user.role, employeeId:user.employeeId},secret,{expiresIn:"1h"});

    return token;
}


export const signUpService = async(body)=>{

    const { name, email, password } = body;

    if (!name || !email || !password) {
      throw new apiError(400, "Invalid credentials");
    }


    const employee = await Employee.create({
      name,
      employeeCode: Math.floor(Math.random() * 100000),
      department: "General"
    });

    const hashedPassword = await bcrypt.hash(password, 10);


    await User.create({
      email,
      password: hashedPassword,
      role: "user",
      employeeId: employee._id
    });

}

