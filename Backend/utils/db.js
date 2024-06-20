import mongoose from 'mongoose'

const DbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('mongodb is connected')
    }catch(error){
            console.log(error)
    }
}

export default DbConnection;