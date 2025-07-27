
const { message } = require('statuses');
const User=require('../models/User')
const bcrypt=require('bcryptjs')

const CreateUser=async(req,res)=>{
    const {username,email,password}=req.body ;
    try{
         // console.log("FORM DATA:", req.body);
         if(await User.findOne({
            username:username,
            email:email,
            password:password
         }))
         {
            return res.status(404).json({error:"User already existing"});
         }
         const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await User.create({
        username:username,
        email:email,
        password:hashedPassword
    })
      req.session.user = {
            id: newUser._id,
            name: newUser.username,
            email: newUser.email
        };
    if(newUser)
      res.redirect('/login');
    
}

    catch(error)
    {
        console.log(error);
        return res.status(501).json({message:"Server Error"})
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body 
    
    try{
   const exsitingUSer=await User.findOne({
    email:email
   })
  // console.log(exsitingUSer);
   
   if(!exsitingUSer)
    return  res.redirect('/signup')
   console.log({exsitingUSer});
const check=await bcrypt.compare(password,exsitingUSer.password);
console.log(check);
  if(check)
     res.redirect('/homepage');
else
    return res.status(401).json({message:"Enter correct Password"});
    }
    catch(err)
    {
     return res.status(505).json({message:"Server Error"})
    }
}

module.exports={CreateUser,loginUser};