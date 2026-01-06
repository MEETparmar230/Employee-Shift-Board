import { success } from "zod";
import { apiError } from "../lib/apiError.js"
import { Employee } from "../models/employee.js";
import { employeeValidations } from "../zod/employee.js";

export const addEmployee = async (req, res, next) => {
    try {

        if (req.user.role != "admin") {
            throw new apiError(403, "Not authorized")
        }

        const body = req.body;

        const result = employeeValidations.safeParse(body)


        if (!result.success) {
            throw new apiError(401, "Invalid input")
        }

        const employee = await Employee.create(result.data);

        if (!employee) {
            throw new apiError(401, "Unable to create Employee")
        }

        res.status(200).json({
            success: true,
            message: "Employee Added"
        })

    }
    catch (err) {
        next(err)
        console.log(err)
    }
}

export const getEmployees = async (req, res, next) => {
    try {

        if (req.user.role != "admin") {
            throw new apiError(403, "Not authorized")
        }

        const employees = await Employee.find({}).sort({employeeCode:1})

        if(!employees.length){
            throw new apiError(404,"Employees are not Found")
        }

        res.status(200).json({
            success:true,
            employees,
            message:"Employees fetched"
        })


    } catch (err) {
        next(err)
    }
}