import express from "express";
import { Getuser, deleteUser } from "../controllers/Admin.js";
import { isAdmin } from "../middleware/verifyToken.js";

const AdminRoute=express.Router()

AdminRoute.get('/getuser', isAdmin, Getuser)
AdminRoute.post('/delete/:id', isAdmin, deleteUser)

export default AdminRoute