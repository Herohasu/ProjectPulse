// import mongoose from "mongoose";
// import UserModel from "./models/user.js"; 
// import { FacultyData } from "./models/Schemas.js"; 

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://dhavalbavdas:12345@cluster0.cmmcity.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// // Transfer Faculty Data Function
// async function transferFacultyData() {
//     try {
//         // Find all users with the role 'faculty'
//         const facultyUsers = await UserModel.find({ role: 'faculty' });

//         if (facultyUsers.length === 0) {
//             console.log('No faculty users found to transfer.');
//             return;
//         }

//         // Prepare data for insertion into FacultyData
//         const facultyDataToInsert = facultyUsers.map(user => ({
//             name: user.name,
//             email: user.email,
//             mobilenumber: user.mobilenumber || "N/A", 
//             gender: user.gender || null, 
//             facultyid: user._id.toString(), 
//             image: user.image || null, 
//             projectsid: [],
//         }));

//         // Insert into FacultyData collection
//         await FacultyData.insertMany(facultyDataToInsert);

//         console.log('Faculty data transferred successfully.');
//     } catch (error) {
//         console.error('Error transferring faculty data:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// }

// // Run the transfer function
// transferFacultyData();


import mongoose from "mongoose";
import UserModel from "./models/user.js"; 
import { FacultyData } from "./models/Schemas.js"; 

// Connect to MongoDB
mongoose.connect('mongodb+srv://dhavalbavdas:12345@cluster0.cmmcity.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Transfer Faculty Data Function
async function transferFacultyData() {
    try {
        // Find all users with the role 'faculty'
        const facultyUsers = await UserModel.find({ role: 'faculty' });

        if (facultyUsers.length === 0) {
            console.log('No faculty users found to transfer.');
            return;
        }

        // Get existing faculty emails to prevent duplicates
        const existingFaculty = await FacultyData.find({ email: { $in: facultyUsers.map(user => user.email) } });
        const existingEmails = existingFaculty.map(faculty => faculty.email);

        // Prepare data for insertion into FacultyData, filtering out existing records
        const facultyDataToInsert = facultyUsers
            .filter(user => !existingEmails.includes(user.email)) // Prevent duplicates
            .map(user => ({
                name: user.name,
                email: user.email,
                mobilenumber: user.mobilenumber || "N/A", 
                gender: user.gender || null, 
                facultyid: user._id.toString(), 
                image: user.image || null, 
                projectsid: [],
            }));

        // Check if there's anything to insert
        if (facultyDataToInsert.length > 0) {
            // Insert into FacultyData collection
            await FacultyData.insertMany(facultyDataToInsert);
            console.log('Faculty data transferred successfully.');
        } else {
            console.log('No new faculty data to transfer.');
        }
    } catch (error) {
        console.error('Error transferring faculty data:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Run the transfer function
transferFacultyData();
