import express from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
const app = express()
const PORT = process.env.PORT || 4000;

mongoose.connect("mongodb://127.0.0.1:27017/newdatabase")
.then(()=>{
    console.log("connection to db established!") 
})

// MVC architecture

//middleware
/* function log(req,res,next){
    console.log("I am a middleware")
    next()
} */

//json middleware parse json data
app.use(express.json())


//Endpoint /users
app.use("/users", userRoutes)


app.listen(PORT, ()=>{
    console.log("server is running on port",PORT)
})
