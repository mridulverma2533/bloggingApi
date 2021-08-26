const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
// const blogs = require("./blog.js")

//register
router.post("/register",async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:hashedpass,
                phone:req.body.phone,
                usertype:req.body.usertype,
            });
        
        const user = await newUser.save();
        res.status(200).json(user);
        

    }catch(err){
        res.status(500).send(err)
    }
})

//login
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        !user && res.status(400).json("invalid emailid")
        const validated  = await bcrypt.compare(req.body.password,user.password);
        ! validated && res.status(400).json("invalid password")
        res.status(200).json(user)
        const {password,...others} = user;
        res.status(200).json(others)
         
        
    }catch(err){
        res.status(500).json(err);
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