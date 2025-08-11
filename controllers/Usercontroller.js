const User=require('../models/User')
const bcrypt=require('bcryptjs')

const CreateUser=async(req,res)=>{
    const {username,email,password}=req.body ;
    try{
         // console.log("FORM DATA:", req.body);
         if(await User.findOne({
            username:username
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
      req.session.user = {      //req.session.(any variable name we can keep)
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
   const exsitingUser=await User.findOne({
    email:email
   })
  // console.log(exsitingUSer);
   
   if(!exsitingUser)
    return  res.redirect('/signup')
   //console.log({exsitingUSer});
const check=await bcrypt.compare(password,exsitingUser.password);// compare method checks the entered password with the already hashed password
//console.log(check);
  if(check){
       req.session.user = {
            id: exsitingUser._id,
            name: exsitingUser.username,
            email: exsitingUser.email
        };
     res.redirect('/homepage');
  }
else
    return res.status(401).json({message:"Enter correct Password"});
    }
    catch(err)
    {
     return res.status(505).json({message:"Server Error"})
    }
}

const logOutUser=(req,res)=>{
    req.session.destroy((err)=>{
        if(err)
            throw err
        res.redirect('/login');
    })
}

module.exports={CreateUser,loginUser,logOutUser};