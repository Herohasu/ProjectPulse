import express from "express";
import multer from "multer";
const router = express.Router();
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

import {
  StudentData,
  TeamsData,
  FacultyData,
  ProjectData,
  NotificationData
} from "../models/Schemas.js";

//==============StudentData================================================

router.get("/StudentDetail/:id", async (req, res) => {
  try {
    const StuData = await StudentData.findById(req.params.id);
    if (!StuData) {
      return res.status(404).json("Student Not Found");
    }
    res.status(200).json(StuData);
  } catch (e) {
    console.log(e);
    res.status(500).json({ eroor: e.message });
  }
});

router.get("/StudentDetailById", async (req, res) => {
  try {
    const { id } = req.query;
    console.log(req.query);
    const Studata = await StudentData.findById({ id });
    const email = Studata.email;
    res.status(200).json(email);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get("/CheckForEmail", async (req, res) => {
  try {
    const { email } = req.query;
    const StuEmailFound = await StudentData.findOne({ email: email });
    if (!StuEmailFound) {
      res.status(200).json({ message: "Email Not Found ", email });
    } else {
      res.status(200).json({ message: "Email Found   ", email });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/ShowStudent", async (req, res) => {
  try {
    const AllStudent = await StudentData.find();
    res.status(200).json(AllStudent);
  } catch (e) {
    console.log(e);
    res.status(500).json({ eroor: e.message });
  }
});

router.post("/AddStudent", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      gender,
      enrollmentnumber,
      mobilenumber,
      branch,
      semester,
      division,
      image,
    } = req.body;
    const newStudent = new StudentData({
      name,
      email,
    });
    if (gender) {
      newStudent.gender = gender;
    }
    if (enrollmentnumber) {
      newStudent.enrollmentnumber = enrollmentnumber;
    }
    if (mobilenumber) {
      newStudent.mobilenumber = mobilenumber;
    }
    if (branch) {
      newStudent.branch = branch;
    }
    if (semester) {
      newStudent.semester = semester;
    }
    if (division) {
      newStudent.division = division;
    }
    if (image) {
      newStudent.image = `upload/${req.file.filename}`;
    }
    newStudent.save();
    res.json(newStudent);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

router.put("/EditStudent/:id", upload.single("image"), async (req, res) => {
  try {
    const StdId = req.params.id;
    const {
      name,
      gender,
      enrollmentnumber,
      email,
      mobilenumber,
      branch,
      semester,
      division,
      image,
    } = req.body;
    const updateData = {
      name,
      email,
    };

    if (gender) {
      updateData.gender = gender;
    }
    if (enrollmentnumber) {
      updateData.enrollmentnumber = enrollmentnumber;
    }
    if (mobilenumber) {
      updateData.mobilenumber = mobilenumber;
    }
    if (branch) {
      updateData.branch = branch;
    }
    if (semester) {
      updateData.semester = semester;
    }
    if (division) {
      updateData.division = division;
    }
    if (req.file) {
      updateData.image = `upload/${req.file.filename}`;
      console.log("done");
    }
    const EditStudent = await StudentData.findByIdAndUpdate(StdId, updateData, {
      new: true,
    });
    res.status(200).json(EditStudent);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

router.delete("/DeleteStudent/:id", async (req, res) => {
  try {
    const StdId = req.params.id;
    const DeleteStudent = await StudentData.findByIdAndDelete(StdId);
    res.status(200).json(DeleteStudent);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//==============TeamsData================================================

router.post("/StudentDetailByEmail", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const StuData = await StudentData.findOne({ email: email });
    if (!StuData) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(StuData);
    console.log(StuData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getStudentDataById(ids) {
  // Map IDs to promises that fetch the email data
  const emailPromises = ids.map(async (id) => {
    const details = await StudentData.findById(id);
    return details ? details.email : null; // Return email or null if not found
  });

  // Wait for all promises to resolve
  const emails = await Promise.all(emailPromises);

  // Filter out any null values (in case some IDs didn't exist)
  return emails.filter((email) => email !== null);
}

router.get("/ShowTeams", async (req, res) => {
  try {
    // console.log("ShowTeams")
    const AllTeams = await TeamsData.find();
    // console.log("all",AllTeams)

    const allTeamData = await Promise.all(
      AllTeams.map(async (team) => {
        const leaderId = team.LeaderName;

        // Fetch leader's data
        const leaderData = await StudentData.findById(leaderId);
        if (!leaderData) {
          throw new Error(`Leader with ID ${leaderId} not found.`);
        }
        const leaderEmail = leaderData.email;

        // Fetch team members' data
        const memberIds = team.TeamMembers;
        const memberEmails = await getStudentDataById(memberIds);

        return {
          _id:team._id,
          TeamName: team.TeamName,
          LeaderName: leaderEmail,
          MemberName: memberEmails,
        };
      })
    );
    // console.log(allTeamData)

    res.status(200).json(allTeamData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/ShowTeamsByEmail/:email", async (req, res) => {
  try {
    const Stemail = req.params.email;
    // console.log(Stemail)
    const student = await StudentData.findOne({email:Stemail}).exec()
    const StId = student._id
    // console.log(student)


    const AllTeams = await TeamsData.find({
      TeamMembers: StId
    }).exec();

    if (AllTeams.length === 0) {
      // console.log("no")
      return res.status(200).json({ message: "No Teams" });
    }

    const allTeamsData = await Promise.all(
      AllTeams.map(async (team) => {
        const leaderId = team.LeaderName;

        // Fetch leader's data
        const leaderData = await StudentData.findById(leaderId);
        if (!leaderData) {
          throw new Error(`Leader with ID ${leaderId} not found.`);
        }
        const leaderEmail = leaderData.email;

        // Fetch team members' data
        const memberIds = team.TeamMembers;
        const memberEmails = await getStudentDataById(memberIds);

        return {
          _id:team._id,
          TeamName: team.TeamName,
          LeaderName: leaderEmail,
          MemberName: memberEmails,
        };
      })
    );
    res.status(200).json(allTeamsData);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

async function getObjectIdsByEmails(emails) {
  const results = await StudentData.find({ email: { $in: emails } })
    .select("_id email")
    .lean();
  const emailToIdMap = new Map(results.map((item) => [item.email, item._id]));
  return emailToIdMap;
}

// Helper function to validate ObjectIds
// async function validateObjectIds(ids) {
//   const results = await StudentData.find({ _id: { $in: ids } }).select('_id').lean();
//   const validIds = results.map(result => result._id.toString());
//   return ids.every(id => validIds.includes(id.toString()));
// }

router.post("/AddTeams", upload.none(), async (req, res) => {
  try {
    const { TeamName, LeaderName, TeamMembers } = req.body;
    console.log("add teams")

    // Convert emails to ObjectIds
    const emails = [
      LeaderName,
      ...TeamMembers.split(",").map((email) => email.trim()),
    ];
    const emailToIdMap = await getObjectIdsByEmails(emails);

    // Convert email addresses to ObjectIds
    const leaderId = emailToIdMap.get(LeaderName);
    const teamMembersArray = TeamMembers.split(",")
      .map((email) => email.trim())
      .map((email) => emailToIdMap.get(email))
      .filter((id) => id);

    if (!leaderId) {
      return res
        .status(400)
        .json({
          error: "Leader email is invalid or not found in StudentData.",
        });
    }

    // Include the leader's ID in the team members array if not already present
    if (!teamMembersArray.includes(leaderId)) {
      teamMembersArray.push(leaderId);
    }

    // Validate that all team member IDs (including the leader's ID) exist in StudentData
    // const allIds = teamMembersArray; // All team members including leader
    // const allIdsValid = await validateObjectIds(allIds);

    console.log(teamMembersArray);

    // if (!allIdsValid) {
    //   return res.status(400).json({ error: 'One or more IDs are invalid or do not exist in StudentData.' });
    // }

    // Create a new team document
    const newTeam = new TeamsData({
      TeamName,
      LeaderName: leaderId,
      TeamMembers: teamMembersArray,
    });

    // Save the new team document to the database
    await newTeam.save();

    // Respond with a success message
    res.status(200).json(newTeam);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// router.post("/AddTeams",upload.none(), async (req, res) => {
//   try {
//     console.log("ca")
//     const { TeamName, LeaderName, TeamMembers } = req.body;
//     console.log("team",TeamMembers.split(',').map(member=>member.trim()))
//     const newTeam = new TeamsData({
//       TeamName,
//       LeaderName,
//       TeamMembers,
//     });
//     newTeam.save();
//     res.status(200).json("newTeam");
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

router.put("/EditTeams/:id", async (req, res) => {
  try {
    const TeamId = req.params.id;
    const { TeamName, MentorName, LeaderName, TeamMembers } = req.body;
    const EditTeamEvent = await TeamsData.findByIdAndUpdate(
      TeamId,
      {
        TeamName,
        MentorName,
        LeaderName,
        TeamMembers,
      },
      { new: true }
    );
    res.status(200).json(EditTeamEvent);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/DeleteTeams/:id", async (req, res) => {
  try {
    const TeamId = req.params.id;
    const DeleteTeam = await TeamsData.findByIdAndDelete(TeamId);
    res.status(200).json({message:"Team Deleted Successfully"});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//==============ProjectData================================================
router.get("/ShowProjects", async (req, res) => {
  try {
    const AllProject = await ProjectData.find();
    res.status(200).json(AllProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/ShowProjectsByEmail/:email',async (req,res)=>{
  try{
    const StEmail = req.params.email
    const StData = await StudentData.findOne({email:StEmail}).exec()
    const StId = StData._id
    
    const AllTeams = await TeamsData.find({
      TeamMembers: StId
    }).exec();

    const TeamsId = AllTeams.map(team => team._id);
    
    // const AllProjectsData = await ProjectData.find({
    //   Teamid: { $in: TeamsId }
    // }).exec();

    const AllProjectsData = await Promise.all(
      TeamsId.map(async (teamId)=>{

         // Fetch all projects for the current teamId
         const projects = await ProjectData.find({ Teamid: teamId }).exec();
                
         // Process each project
         const projectDetails = await Promise.all(projects.map(async (project) => {
             // Fetch the team and mentor details
             const team = await TeamsData.findById(teamId).exec();
             const mentor = await FacultyData.findById(project.Mentorid).exec();
             
             // Combine project data with additional details
             return {
                 ...project.toObject(), // Convert Mongoose document to plain object
                 TeamName: team ? team.TeamName : 'Unknown Team',
                 MentorName: mentor ? mentor.name : 'Unknown Mentor'
             };
         }));
         
         return projectDetails;
      })
    )
    const flattenedProjects = AllProjectsData.flat();
    res.status(200).json(flattenedProjects)
  }catch(err){console.log(err) 
    res.status(500).json({error : err.message })}
})

router.post("/AddProjects", async (req, res) => {
  try {
    const { ProjectTitle, ProjectDescription, Mentorid, Teamid, Year } =
      req.body;
    const newProject = new ProjectData({
      ProjectTitle,
      ProjectDescription,
      Mentorid,
      Teamid
    });
    if(Year){
      newProject.Year = Year
    }
    newProject.save();
    res.status(200).json("newProject");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/EditProjects/:id", async (req, res) => {
  try {
    const ProjectId = rea.params.id;
    const { ProjectTitle, ProjectDescription, Mentorid, Teamid, Year } =
      req.body;
    const EditProject = await ProjectData.findByIdAndUpdate(
      ProjectId,
      {
        ProjectTitle,
        ProjectDescription,
        Mentorid,
        Teamid,
        Year,
      },
      { new: true }
    );
    res.status(200).json(EditProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/DeleteProjects/:id", async (req, res) => {
  try {
    // console.log("del")
    const ProjectId = req.params.id;
    const DeleteProject = await ProjectData.findByIdAndDelete(ProjectId);
    res.status(200).json(DeleteProject);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

//==============FacultyData================================================

router.get("/FacultyDetailByEmail", async (req, res) => {
  try {
    const {email} = req.query;
    const FacData = await FacultyData.findOne({email:email});
    if (!FacData) {
      return res.status(404).json("Faculty Not Found");
    }
    res.status(200).json(FacData);
  } catch (e) {
    console.log(e);
    res.status(500).json({ eroor: e.message });
  }
});

router.get("/ShowFacultysData", async (req, res) => {
  try {
    const AllFacultys = await FacultyData.find();
    res.status(200).json(AllFacultys); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/AddFaculty", async (req, res) => {
  try {
    const { name, facultyid, email, mobilenumber, projectsid } = req.body;
    const newFaculty = new FacultyData({
      name,
      facultyid,
      email,
      mobilenumber,
    });
    if (projectsid) {
      newFaculty.projectsid = projectsid;
    }
    await newFaculty.save();
    res.status(200).json(newFaculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/EditFaculty/:id",upload.single('image'), async (req, res) => {
  try {
    console.log("acacsn")
    const Facultyid = req.params.id;
    console.log(Facultyid)
    const {
      name,
      gender,
      facultyid,
      email,
      mobilenumber
    } = req.body;

    const updateData = {
      name,
      email,
    };
    if (gender) {
      updateData.gender = gender;
    }
    if (mobilenumber) {
      updateData.mobilenumber = mobilenumber;
    }
    if (facultyid) {
      updateData.facultyid = facultyid;
    }
    if (req.file) {
      updateData.image = `upload/${req.file.filename}`;
      console.log(updateData)
      console.log("done");
    }
    const EditFaculty = await FacultyData.findByIdAndUpdate(Facultyid, updateData, {
      new: true,
    });
    console.log(EditFaculty)
    res.status(200).json(EditFaculty);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

router.delete("/DeleteFaculty/:id", async (req, res) => {
  try {
    const Facultyid = req.params.id;
    const DeleteProject = await FacultyData.findByIdAndDelete(Facultyid);
    res.status(200).json(DeleteProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//==============NotificationData================================================
router.get("/ShowAllNotifications", async (req, res) => {
  try {
    const AllNotifications = await NotificationData.find();
    res.status(200).json(AllNotifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/AddNotifications", async (req, res) => {
  try {
    const { message, deadlineDate, forWhom } = req.body;
    const newNotification = new NotificationData({
      message,
      deadlineDate,
      forWhom,
    });
    newNotification.save();
    res.status(200).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/EditNotification/:id", async (req, res) => {
  try {
    const NotifId = req.params.id;
    const { message, deadlineDate, forWhom } = req.body;
    const EditNotifi = await NotificationData.findByIdAndUpdate(
      NotifId,
      {
        message,
        deadlineDate,
        forWhom,
      },
      { new: true }
    );
    res.status(200).json(EditNotifi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/DeleteNotification/:id", async (req, res) => {
  try {
    const NotifiId = req.params.id;
    const DeleteNotification = await NotificationData.findByIdAndDelete(
      NotifiId
    );
    res.status(200).json(DeleteNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
