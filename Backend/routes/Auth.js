import express from 'express'
import { Login, register, Logout } from '../controllers/Auth.js'

const AuthRoutes=express.Router()

AuthRoutes.post('/register',register)
AuthRoutes.post('/login',Login)
AuthRoutes.post('/logout',Logout)
export default AuthRoutes