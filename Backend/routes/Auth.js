import express from 'express'
import { register } from '../controllers/Auth.js'

const AuthRoutes=express.Router()

AuthRoutes.post('/register',register)
AuthRoutes.post('/login',register)
export default AuthRoutes