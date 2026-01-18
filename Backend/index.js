import express from "express"
import Dotenv  from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import noteRoute from "./routes/note.routes.js"
import cors from "cors"
Dotenv.config()

let app=express()
let port = process.env.PORT || 3000

app.use(
  cors({
    origin:"https://notevault-23jx.onrender.com"
    credentials: true,               // cookies / jwt ke liye
  })
);
app.use(express.json())
app.use(cookieParser())
app.use("/api",authRouter)
app.use("/api/notes", noteRoute)


app.listen(port,()=>{
    connectDB()
    console.log(`Server is running on port ${port}`);
})
