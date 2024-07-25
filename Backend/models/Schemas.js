import mongoose from "mongoose";

const StudentDataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    enrollmentnumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    division:{
        type:String,
        required:true
    }
},{timestamps:true})
const StudentData = mongoose.model('StudentData',StudentDataSchema)


export default StudentData;