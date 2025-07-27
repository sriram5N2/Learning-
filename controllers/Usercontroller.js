
const User=require('../models/User')


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
    const newUser=await User.create({
        username:username,
        email:email,
        password:password
    })
    if(newUser)
     return res.redirect('/login');
    else
    return res.redirect('/signup');
}

    catch(error)
    {
        console.log(error);
        return res.status(501).json({message:"Server Error"})
    }
}

module.exports={CreateUser};