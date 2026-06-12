const express = require("express");

const router = express.Router();

const User = require("../models/User");


// REGISTER
router.post("/register", async (req, res) => {

    try{

        const { name, email, password } = req.body;

        // CHECK EMPTY
        if(!name || !email || !password){

            return res.status(400).json({
                msg:"Please fill all fields"
            });

        }

        // CHECK USER
        const existingUser =
        await User.findOne({ email });

        if(existingUser){

            return res.status(400).json({
                msg:"User already exists"
            });

        }

        // CREATE USER
        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        // SUCCESS RESPONSE
        return res.status(201).json({
            msg:"Registration Successful"
        });

    }catch(error){

        console.log(error);

        return res.status(500).json({
            msg:"Server Error"
        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try{

        const { email, password } = req.body;

        const user =
        await User.findOne({ email });

        if(!user){

            return res.status(400).json({
                msg:"Invalid Email"
            });

        }

        if(user.password !== password){

            return res.status(400).json({
                msg:"Invalid Password"
            });

        }

        return res.status(200).json({
            msg:"Login Successful",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    }catch(error){

        console.log(error);

        return res.status(500).json({
            msg:"Server Error"
        });

    }

});

module.exports = router;