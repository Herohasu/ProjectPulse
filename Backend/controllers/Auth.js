import UserModel from "../models/user.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        
        const existUser= await UserModel.findOne({email})
        if(existUser){
            return res.status(401).json({success:false,message:"User already Exist"})
        }

        const hashpassword= await bcryptjs.hashSync(password, 10)

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

const Login=async(req,res)=>{
    try {
        const{email,password}=req.body

        const user=await UserModel.findOne({email})
        if (!user){
            return res.status(404).json({success:false,message:"Invalid Credentials"})
        }

        const ispasswordValid = await bcryptjs.compare(password,user.password)
        if(!ispasswordValid){
            return res.status(404).json({success:false,message:"Invalid Credentials"})
        }
            const token= jwt.sign({userId:user._id},process.env.JWT_SECRET)
            res.cookie('token',token,{
                httpOnly:true,
                secure:false,
                maxAge:3600000
            })
        res.status(200).json({success:true,message:"User Registration successful",user,token})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"})
        console.log(error)
    }
}
const Logout=async(_req,res)=>{
    try {
        res.clearCookie('token')
        res.status(200).json({message:"User Logout successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"})
        console.log(error)
    }
}

export {register,Login,Logout}