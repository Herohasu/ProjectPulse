import express from "express";
// const app=express();
const router = express.Router() 

import StudentData from '../models/Schemas.js';

router.get('/ShowStudent',async (req,res)=>{
    try{
        const AllStudent = await StudentData.find()
        res.status(200).json(AllStudent)
    }
    catch(e){
        console.log(e)
        res.status(500).json({eroor:e})
    }
})

router.post('/AddStudent', async (req,res)=>{
    try{
        const {name,enrollmentnumber,email,division}=req.body
        const newStudent = new StudentData({name,enrollmentnumber,email,division})
        newStudent.save()
        res.json('newStudent')
    }
    catch(e){
        console.log(e)
        res.status(500).json({error:e})
    }
})

export default router;
