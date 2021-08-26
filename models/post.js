const mongoose= require("mongoose")



const postschema = new mongoose.Schema({
    title:{
        type:String,
        required: true,

     },
     authorname:{
         type:String,
         required:true
         
     },
     article:{
        type:String,
        required:true,

     },
     username:{
         type:String,
         required:true,
     },
     category:{
        type:String,
        unique:true,
        
     },
     

    },
    {timestamps: true})

module.exports  =  mongoose.model('post', postschema)