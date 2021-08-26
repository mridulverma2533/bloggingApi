const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");



//update
router.put("/:id",async(req,res)=>{
    if(req.body.userid===req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }

    
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,

        });
        res.status(200).json(updatedUser)



    }catch(err){
        res.status(500).json(err);
    }
 }else{
     res.status(401).json("you can updated only your account!")
 }

})
//get user

router.get("/:id",async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password,...others}= user._doc
        res.status(200).json(others)
        
    } catch(error) {
        res.status(500).json(error)
        
    }

})

module.exports = router