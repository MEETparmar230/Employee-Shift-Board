import mongoose from 'mongoose'

 const shiftSchema = mongoose.Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee",required:true},
    date:{type:String,required:true},
    startTime:{type:String,required:true},
    endTime:{type:String, required:true}
})

export const Shift = mongoose.model("Shift",shiftSchema);