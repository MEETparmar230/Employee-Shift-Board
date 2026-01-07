
import { addEmployeeSrevice, getEmployeesService } from "../services/adminServices.js";

export const addEmployee = async (req, res, next) => {
    try {

        await addEmployeeSrevice(req.body)

        res.status(200).json({
            success: true,
            message: "Employee Added"
        })

    }
    catch (err) {
        next(err)
    }
}

export const getEmployees = async (req, res, next) => {
    try {

        const employees = await getEmployeesService()

        res.status(200).json({
            success:true,
            employees,
            message:"Employees fetched"
        })


    } catch (err) {
        next(err)
    }
}