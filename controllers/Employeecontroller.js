
const { message } = require('statuses');
const Employee=require('../models/Employee');

// Creating the Employee Record
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

// Read all employee Records
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

// update employee record 

const UpdateEmployee=async(req,res)=>{
    try{
    const {id}=req.params 
    const updates=req.body 
    const updatedEmployee=await Employee.findByIdAndUpdate(id,updates);
    if(!updatedEmployee){
        console.log("Employee Not Found");
     return res.status(501).json({message:"Employee Not Found"});
    }
    console.log("Employee Updated Succesfully")
    return res.status(201).json({message:"Employee Updated Succesfully"});
}
    catch(error)
    {
       console.log("There is an Error in the Updated Employee Controller");
       res.status(501).json({message:"Server Error"});
    }
}

// Deleting the Employee Record 

const DeleteEmployee=async (req,res) => {
    try{
        const {id}=req.params;
        const deletedEmployee=await Employee.findByIdAndDelete(id);// This method will expect a string not an object
        if(deletedEmployee){
            console.log("Employee Deleted SuccesFully");
            return res.status(201).json({message:"Employee Deleted SuccesFully"});
        }
        return res.status(501).json({message:"Employee Not found for deletion"});
    }
    catch(error)
    {
        console.log('The Error is from DeleteEmployee Controller',error);
        res.status(501).json({message:"Server Error"});

    }
}



module.exports={CreateEmployee,GetallEmployees,UpdateEmployee,DeleteEmployee}
