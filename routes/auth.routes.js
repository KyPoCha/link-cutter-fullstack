const {Router} = require("express");
const router = Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

// /api/auth

router.post(
    "/register",
    [
        check("email", "Wrong email").isEmail(),
        check("password", "Minimum password length is 6 symbols").isLength({min: 6})
    ],
    async (req, res)=>{
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Wrong data in registration"})
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({email});

        if(candidate){
            return res.status(400).json({message: "That user is already exist"});
        }

        const hashedPassword = await bcrypt.hash(password,12);
        const user = new User({email, password: hashedPassword});

        await user.save();
        res.status(201).json({message: "User is created"});
    }
    catch (e){
        res.status(500).json({message: "Something gone wrong. Try again"});
    }
})

router.post(
    "/login",
    [
      check("email", "Enter correct email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists()
    ],
    async (req, res)=>{
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Wrong data in login"})
        }

        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "User is not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Wrong password. Try again"});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get("jwtSecret"),
            { expiresIn: "1h"}
        );

        res.json({token, userId: user.id});

    }
    catch (e){
        res.status(500).json({message: "Something gone wrong. Try again"});
    }
})

module.exports = router;