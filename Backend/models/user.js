import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['admin',"user","faculty"],
        default:"user"
    },
    password:{
        type:String,
        required:true
    },resetPasswordToken: String,
    resetPasswordExpires: Date
},{timestamps:true})

const UserModel= mongoose.model('user',userSchema)

export default UserModel;