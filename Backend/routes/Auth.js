import express from 'express'
import { Login, register, Logout, checkuser,requestPasswordReset } from '../controllers/Auth.js'
import { IsUser } from '../middleware/verifyToken.js'

const AuthRoutes=express.Router()

AuthRoutes.post('/register',register)
AuthRoutes.post('/login',Login)
AuthRoutes.post('/forgot-password', requestPasswordReset)
AuthRoutes.post('/reset-password/:token')
AuthRoutes.post('/logout',Logout)
AuthRoutes.get('/checkuser',IsUser,checkuser)


export default AuthRoutes