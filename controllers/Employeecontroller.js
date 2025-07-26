const { message } = require('statuses');
const Employee=require('../models/Employee');

// creating 
const CreateEmployee = async(req,res)=>{
    try{
                const {name,email,phone,city}=req.body
                if(await Employee.findOne({name:name,
                    email:email,
                    phone:phone,
                    city:city
                }))
                {
                    console.log("You have already have an account Sir")
                    console.log(Employee.findOne({name:name}));
                    return res.status(501).json({message:"User is Already Existing"});
                    
                }
                const employee=new Employee({
                    name,
                    email,
                    phone,
                    city
                })
                await employee.save();
                console.log("Employee Created SuccessFully")
                return res.status(201).json({"message":"Employee Created succesfully"})
    }
    catch(error)
    {
    console.log("There is an Error",error)
    res.status(501).json({"message":"Server Error"})
    }
}

const GetallEmployees=async(req,res)=>{
    try{
        const employees=await Employee.find();
        res.status(201).json(employees);
    }
    catch(error)
    {
        res.status(501).json({message:"Unable to Fetch all employees"});
    }
}




module.exports={CreateEmployee,GetallEmployees}
