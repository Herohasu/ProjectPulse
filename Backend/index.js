import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import DbConnection from './utils/db.js'
import AuthRoutes from './routes/Auth.js'

dotenv.config()
const PORT=process.env.PORT || 3000
const app=express()

//mongodb
DbConnection()

app.use(express.json())
app.use(cors())
app.use('/api/auth',AuthRoutes)
app.get('/', (req,res)=>{
    res.send('test')
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})