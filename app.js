const express = require("express")
const app = express();
const port =process.env.PORT || 5000;
const mongoose= require("mongoose")

 const authroute = require("./routes/auth.js")
 const userroute = require("./routes/user.js")
 const postroute = require("./routes/posts.js")
 const categoryroute = require("./routes/category.js")

// const blo = require("../src/auth.js")
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/dummyapi2",{
    useCreateIndex: true,
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology: true 
    
}).then( ()=>{
    console.log("connection is successful");
}).catch((e)=>{
    console.log("no connection");
})
 app.use("/api/auth", authroute);
 app.use("/api/user", userroute);
 app.use("/api/post",postroute);
 app.use("/api/category", categoryroute);








app.listen(port,(req,res)=>{
    console.log(`listining port ${port}`)
})
