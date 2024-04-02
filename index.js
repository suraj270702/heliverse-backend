import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/user.route.js'
import teamRoute from './routes/team-route.js'

const app = express()
dotenv.config()


//database connection
const db = async()=>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(
          process.env.MONGOOSE_URL
        );
        console.log("Database Connected");
      } catch (error) {
        console.log(error);
      }
}

//middleware
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173","https://heliverse-surajmaurya.netlify.app"]
}))


//routes

app.use("/api",userRoute)
app.use("/api/team",teamRoute)

app.listen('8000', () => {
    db()
    console.log(`Server running on port 8000`)

})

