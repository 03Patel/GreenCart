const express = require("express");
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const jwtSecret = "mynameisganeshjipatelbuildingGreenCart"

router.post("/login", [
    body("password","Incorrect Password").isLength({ min: 6 }),
    body("email").isEmail()]
    , async (req , res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
    let email = req.body.email;

    try {
      let userEmail= await  User.findOne({email});
        if(!userEmail){
             return res.status(400).json({error:error.array()})
        }
        if(!req.body.password === userEmail.password){
              return res.status(400).json({error:error.array()})
        }
        return res.status(400).json({success:true})

        
    }catch (error){
             console.log(error)
             res.json({success:false})
    
    }
})



router.post("/signup", [
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 6 }),
    body("email").isEmail()]
    , async (req , res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);
        try{
            await User.create({
                name:req.body.name,
                password:secPassword,
                email:req.body.email,
                location:req.body.location
            })
            res.json({success:true})
        }catch(error){
            console.log(error)
            res.json({success:false})
        }
    } 




)

module.exports = router;