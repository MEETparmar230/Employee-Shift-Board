import { apiError } from "../lib/apiError.js"
import { Employee } from "../models/employee.js"
import { employeeValidations } from "../zod/employee.js"

export const addEmployeeSrevice  = async(input) =>{

    const result = employeeValidations.safeParse(input)

        if (!result.success) {
            throw new apiError(401, "Invalid input")
        }

    const employee = await Employee.create(result.data);

        if (!employee) {
            throw new apiError(401, "Unable to create Employee")
        }

    
}

export const getEmployeesService = async () =>{

    const employees = await Employee.find({}).sort({employeeCode:1})

        if(!employees.length){
            throw new apiError(404,"Employees not Found")
        }

        return employees;
}