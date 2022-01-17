const exp=require('express')
const User = require('../models/userSchema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const router=exp.Router()

router.get('/',(req,res)=>
{
    res.cookie("shiv","shakti")
    res.json("om namah shivaya")
})

router.post('/register',async(req,res)=>{
   
    const isUserExist=await User.findOne({email:req.body.email})
    if(isUserExist){  res.status(422).json({message:"User already exists"})  }
    else
    {
        
        const e=await bcrypt.hash(req.body.password,12)
        req.body.password=e
        const {email, password}=req.body
        const user=new User({email, password})

        const isSave = await user.save()
        if(isSave)
        {
            res.status(201).json({message:"User registered succesfully........."})
        }
        else
        {
            res.status(500).json({message:"Failed to register......"})
        }
    }
});

router.post('/login',async(req,res)=>
{
    const {email,password}=req.body

    const isExists=await User.findOne({email:email})
    if(!isExists)
    {
        res.json({message:"Invalid username"})
    }
    else
    {
        const cmp=await bcrypt.compare(password,isExists.password)
        if(!cmp)
        {
            res.json({message:"Invalid password"})
        }
        else
        {
            const token=jwt.sign({email:email},process.env.SECRET_KEY,{expiresIn:Date.now()+25892000000})
            res.cookie("token",token)
            res.json({message:"User logged successfully",token})
        }
    }
})

module.exports=router