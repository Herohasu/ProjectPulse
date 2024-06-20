import jwt  from 'jsonwebtoken'
import UserModel from '../models/user.js'

const isAdmin=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({message:"Unauthorised: no token provided"})
        }

        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        const user=await UserModel.findById(decoded.userId)
        
        if(!user){
            return res.status(401).json({message:"'User not found'"})
        }

        if(user.role !== 'admin'){
            return res.status(403).json({message:"'User is not Admin'"})

        }
        req.user=user
        next()

        
    } catch (error) {
        console.log(error)
    }
}

export {isAdmin}