import { request } from "express";
import mongoose, { model, Schema } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const StudentDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: false,
    },
    enrollmentnumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: String,
      required: false,
    },
    branch: {
      type: String,
      required: false,
    },
    semester: {
      type: String,
      required: false,
    },
    division: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const StudentData = mongoose.model("StudentData", StudentDataSchema);

const TeamsDataSchema = new mongoose.Schema(
  {
    TeamName: {
      type: String,
      required: true,
    },
    LeaderName: {
      type: ObjectId,
      ref: "StudentData",
      required: true,
    },
    TeamMembers: {
      type: [{ type: ObjectId, ref: "StudentData" }],
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 4;
        },
        message: (props) =>
          `${props.value.length} is not a valid number of team members. Must be between 1 and 4.`,
      },
    },
  },
  { timestamps: true }
);
const TeamsData = mongoose.model("TeamsData", TeamsDataSchema);

const ProjectDataSchema = new mongoose.Schema(
  {
    ProjectTitle: {
      type: String,
      required: true,
    },
    ProjectDescription: {
      type: String,
      required: true,
    },
    Mentorid: {
      type: ObjectId,
      ref: "FacultyData",
      required: true,
    },
    Teamid: {
      type: ObjectId,
      ref: "TeamsData",
      required: true,
    },
    approval: {
      type: String,
      enum: ["yes", "no"],
    },
    comment: {
      type: String,
      required: false
    },
    completionrate:{
      type:Number,
      required:false
    },
    Year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const ProjectData = mongoose.model("ProjectData", ProjectDataSchema);

const FacultyDataScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: false,
    },
    facultyid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    projectsid: {
      type: [{ type: ObjectId, ref: "ProjectData" }],
    },
  },
  { timestamps: true }
);
const FacultyData = mongoose.model("FacultyData", FacultyDataScehma);

const NotificationDataSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    deadlineDate: {
      type: String,
      required: true,
    },
    forWhom: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const NotificationData = mongoose.model(
  "NotificationData",
  NotificationDataSchema
);

const FilesDataSchema = new mongoose.Schema({
  projectId:{
    type:ObjectId,
    ref:'ProjectData'
  },
  fileName:{
    type:String,
    required:true
  },
  file:{
    type:String,
    required:true
  },
  commentOnFileByStudent:{
    type:String,
    required:false
  },
  commentOnFileByFaculty:{
    type:String,
    required:false
  },
  approval:{
    type:String,
    enum:['yes','no'],
    required:false
  }
},{timestamps:true})
const FilesData = mongoose.model('FilesData',FilesDataSchema)

const WeeklyReportsDataSchema = new mongoose.Schema({
  projectId:{
    type:ObjectId,
    ref:'ProjectData'
  },
  file:{
    type:String,
    required:true
  },
  commentOnFileByStudent:{
    type:String,
    required:false
  },
  commentOnFileByFaculty:{
    type:String,
    required:false
  },
  approval:{
    type:String,
    enum:['yes','no'],
    required:false
  },
  submissionDate:{
    type:String,
    required:true
  }
},{timestamps:true})
const WeeklyReportsData = mongoose.model('WeeklyReportsData',WeeklyReportsDataSchema)

const ProgressForStudentByFacultySchema = new mongoose.Schema({
  progress: {
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
})
const ProgressByFaculty = model('ProgressByFaculty', ProgressForStudentByFacultySchema);

export { StudentData, TeamsData, ProjectData, FacultyData, NotificationData, FilesData, WeeklyReportsData, ProgressByFaculty};