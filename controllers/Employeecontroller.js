const Employee=require('../models/Employee');


const CreateEmployee = async(req,res)=>{
    try{
                const {name,email,phone,city}=req.body
                const employee=new Employee({
                    name,
                    email,
                    phone,
                    city
                })
                await employee.save();
                console.log("Employee Created SuccessFully")
                res.status(201).json({"message":"Employee Created succesfully"})
    }
    catch(error)
    {
    console.log("There is an Error",error)
    res.status(501).json({"message":"Server Error"})
    }
}

module.exports={CreateEmployee}
