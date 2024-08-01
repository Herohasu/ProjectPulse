import mongoose, { model, Schema } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const StudentDataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type: String,
        enum: ['male', 'female'], 
        required: false,
    },
    enrollmentnumber:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:String,
        required:false
    },
    branch:{
        type:String,
        required:false
    },
    semester:{
        type:String,
        required:false
    },
    division:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
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
        type:String,
        required:true
    },
    projectsid:{
        type:[{type:ObjectId , ref:"ProjectData"}]
    }
},{timestamps:true})
const FacultyData = mongoose.model('FacultyData',FacultyDataScehma)



const NotificationDataSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    deadlineDate:{
        type:String,
        required:true
    },
    forWhom:{
        type:String,
        required:true
    }
},{timestamps:true})
const NotificationData = mongoose.model('NotificationData',NotificationDataSchema)



export {StudentData,TeamsData,ProjectData,FacultyData,NotificationData};