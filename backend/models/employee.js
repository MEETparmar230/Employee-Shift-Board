import mongoose from 'mongoose'

 const employeeSchema = mongoose.Schema({
    name:{type:String,required:true},
    employeeCode:{type:Number,required:true},
    department:{type:String,required:true}
})

export const Employee = mongoose.model("Employee",employeeSchema);