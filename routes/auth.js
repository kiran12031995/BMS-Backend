const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Register //
router.post('/register',async(req,res)=>{
    try{
        const saltrounds = 10;
        const salt = new bcrypt.genSalt(saltrounds);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

// Login //
router.post('/login',async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(400).json('Wrong Credentials');

        const validate = await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(400).json('Wrong Credentials');

        const {password,...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;