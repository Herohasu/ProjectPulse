import express from "express";
import { Getuser, deleteUser,editUser } from "../controllers/Admin.js";
import { isAdmin } from "../middleware/verifyToken.js";

const AdminRoute=express.Router()

AdminRoute.get('/getuser', isAdmin, Getuser)
AdminRoute.delete('/delete/:id', isAdmin, deleteUser);
AdminRoute.put('/editUser/:id',isAdmin,editUser)

export default AdminRoute