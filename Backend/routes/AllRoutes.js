import express from "express";
const router = express.Router() 

import {StudentData,TeamsData} from '../models/Schemas.js';
// import {TeamsData} from '../models/Schemas.js';
import {FacultyData,ProjectData} from '../models/Schemas.js';


//==============StudentData================================================
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
        const {name,enrollmentnumber,email,mobilenumber,branch,semester,division}=req.body
        const newStudent = new StudentData({name,enrollmentnumber,email,mobilenumber,branch,semester,division})
        newStudent.save()
        res.json(newStudent)
    }
    catch(e){
        console.log(e)
        res.status(500).json({error:e})
    }
})

router.put('/EditStudent/:id', async (req,res)=>{
    try{
        const StdId = req.params.id
        const {name,enrollmentnumber,email,mobilenumber,branch,semester,division}=req.body
        const EditStudent = await StudentData.findByIdAndUpdate(StdId,{name,enrollmentnumber,email,mobilenumber,branch,semester,division})
        res.status(200).json(EditStudent)
    }catch(e){
        res.status(500).json({error:e})
    }
})

router.delete('/DeleteStudent/:id', async (req,res)=>{
    try{
        const StdId = req.params.id
        const DeleteStudent = await StudentData.findByIdAndDelete(StdId)
        res.status(200).json(DeleteStudent)
    }
    catch(e){
        res.status(500).json({error:e})
    }
})


//==============TeamsData================================================

router.get('/ShowTeams', async (req,res)=>{
    try{
        const AllTeams = await TeamsData.find();
        res.status(200).json(AllTeams)
    }catch(e){
        res.status(500).json({error:e})
    }
})

router.post('/AddTeams', async (req,res)=>{
    try{
        const {TeamName,MentorName,LeaderName,TeamMembers} = req.body;
        const newTeam = new TeamsData({TeamName,MentorName,LeaderName,TeamMembers})
        newTeam.save()
        res.status(200).json('newTeam')
    }catch(e){
        res.status(500).json({error:e})
    }
})

router.put('/EditTeams/:id', async (req,res)=>{
    try{
        const TeamId = req.params.id;
        const {TeamName,MentorName,LeaderName,TeamMembers} = req.body;
        const EditTeamEvent = await TeamsData.findByIdAndUpdate(TeamId,{TeamName,MentorName,LeaderName,TeamMembers});
        res.status(200).json(EditTeamEvent)
    }catch(e){
        res.status(500).json({error:e})
    }
})

router.delete('/DeleteTeams/:id',async (req,res)=>{
    try{
        const TeamId = req.params.id;
        const DeleteTeam = await TeamsData.findByIdAndDelete(TeamId);
        res.status(200).json(DeleteTeam)
    }catch(e){
        res.status(500).json({error:e})
    }
})


//==============ProjectData================================================

export default router;
