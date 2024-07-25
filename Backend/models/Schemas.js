import mongoose, { Schema } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

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
    mobilenumber:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    division:{
        type:String,
        required:true
    }
},{timestamps:true})
const StudentData = mongoose.model('StudentData',StudentDataSchema)



const TeamsDataSchema = new mongoose.Schema({
    TeamName:{
        type:String,
        required:true
    },
    LeaderName:{
        type:String,
        required:true
    },
    TeamMembers:{
        type:[{ type: ObjectId, ref: 'StudentData' }],
        validate:{
            validator : function(v){
                return v.length>=1 && v.length <=4;
            },
            message: props => `${props.value.length} is not a valid number of team members. Must be between 1 and 4.`
        }
    }
},{timestamps:true});
const TeamsData = mongoose.model('TeamsData',TeamsDataSchema)



const ProjectDataSchema = new mongoose.Schema({
    ProjectTitle:{
        type:String,
        required:true
    },
    ProjectDescription:{
        type:String,
        required:true
    },
    Mentorid:{
        type:ObjectId,
        ref:"FacultyData",
        required:true
    },
    Teamid:{
        type: ObjectId,
        ref:"TeamsData",
        required:true
    },
    Year:{
        type:Number,
        required:true
    }
},{timestamps:true})
const ProjectData = mongoose.model('ProjectData',ProjectDataSchema)



const FacultyDataScehma = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    facultyid:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:Number,
        required:true
    },
    projectsid:{
        type:[{type:ObjectId , ref:"ProjectData"}]
    }
},{timestamps:true})
const FacultyData = mongoose.model('FacultyData',FacultyDataScehma)



export {StudentData,TeamsData,ProjectData,FacultyData};