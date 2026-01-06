import { config } from 'dotenv';
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRouter.js'
import adminRouter from './routes/adminRouter.js'
import shiftRouter from './routes/shiftRouter.js'
import db from './lib/db.js';
import { errorHandler } from './lib/errHandler.js';
import cookieParser from 'cookie-parser';


const app = express();

config()
const port = process.env.PORT || 4000
const client = process.env.CLIENT

app.use(cors({
    origin:[client],
    methods: ['GET', 'POST','DELETE'],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use(express.json())
app.use(cookieParser());

//mongodb connection function
await db();


//user routes       
app.use("/user",userRouter)

app.use("/admin",adminRouter)

app.use("/shifts",shiftRouter)

//error handler middleawre
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`server is runnig on ${port} port`)
})