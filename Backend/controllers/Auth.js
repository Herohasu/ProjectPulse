import UserModel from "../models/user.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        
        const existUser= await UserModel.findOne({email})
        if(existUser){
            return res.status(401).json({success:false,message:"User already Exist"})
        }

        const hashpassword= await bcryptjs.hashSync(password, 10)

        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashpassword,
            role: req.body.role 
          });
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
        console.log(req.body)

        const user=await UserModel.findOne({email})
        if (!user){
            console.log("dfgh")
            return res.status(404).json({success:false,message:"Invalid Credentials"})
        }

        const ispasswordValid = await bcryptjs.compare(password,user.password)
        if(!ispasswordValid){
            console.log("sfd")
            return res.status(404).json({success:false,message:"Invalid Credentials"})
        }
            const token= jwt.sign({userId:user._id},process.env.JWT_SECRET)
            res.cookie('token',token,{
                httpOnly:true,
                secure:false,
                maxAge:3600000
            })
        console.log(user)
        res.status(200).json({success:true,message:"User Login successful",user,token})
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

const checkuser=async(req,res)=>{
    try {
        const user= req.user
       if(!user){
        res.status(404).json({message:'User not found'})
       }
       res.status(200).json({user})
    } catch (error) {
       res.status(500).json({message:"internal server error"})
        console.log(error)
    }
}

const requestPasswordReset = async (req,res)=>{
    console.log("callesd request")
    const {email} =req.body;
    const user = await UserModel.findOne({email})

    if(!user){
        return res.status(200).send("User Not Found")
    }

    const token = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 1800000

    await user.save()

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'djbavda@gmail.com',
            pass: 'vlbu xpfk ijjk jwhi'
        }
    });


    const mailOptions = {
        to: "studyai2909@gmail.com",
        from: 'passwordreset@projectpulse.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
              `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
              `http://localhost:5173/reset-password/${token}\n\n` +
              `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Password reset email sent');
    });
}

const resetPassword = async (req, res) => {
    console.log("called resetpassword")
    const { token } = req.params;
    const { password } = req.body;

    const user = await UserModel.findOne({ 
        resetPasswordToken: token, 
        resetPasswordExpires: { $gt: Date.now() } 
    });

    if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired');
    }
    
    user.password = await bcryptjs.hashSync(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send('Password has been reset');
};

export {register,Login,Logout,checkuser,requestPasswordReset,resetPassword}