import UserModel from "../models/user.js"
import bcryptjs from 'bcryptjs'
const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        
        const existUser= await UserModel.findOne({email})
        if(existUser){
            return res.status(401).json({success:false,message:"User already Exist"})
        }

        const hashpassword=await bcryptjs.hashSync(password,10)

        const newUser= new UserModel({
            name,email,password:hashpassword
        })
            await newUser.save()

            res.status(200).json({message:"User register Successfully",newUser})

    }catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"})
        console.log(error)

    }
}


export {register}