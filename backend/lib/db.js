
import { config } from 'dotenv'
import mongoose from 'mongoose'

config()
const uri = process.env.DB_URI

 const db = async () => {
    try {
        if (mongoose.connection.readyState == 0) {
            await mongoose.connect(uri);
        }
        console.log("MongoDB Connected")
    } catch (error) {
        console.error("Error while connecting to database : ", error)
    }
}

export default db; 