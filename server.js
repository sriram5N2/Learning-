const express=require('express');

const mongoose=require('mongoose');
const Employee=require('./models/Employee')
const employeeRoutes=require('./routes/employeeRoutes')
const app=express();

const PORT=3000;

app.use(express.json());


mongoose.connect("mongodb+srv://sriramt234:sriram1234@cluster0.ezqbeb2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('Mongodb connected succesfully')
}).catch((e)=>{
  console.log('Database Not Connected',e)
})

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });

  // For mounting Purpose
app.use('/employees',employeeRoutes)


app.get('/apple',(req,res)=>{
  console.log('apple url hitted');
  res.send("Apple")
})

// Created for checking whether the server is working or not 
app.post("/emp",async(req,res)=>{
  try{
   const {name,email,phone,city}=req.body;
   const employee=new Employee({
    name,
    email,
    phone,
    city
   })
   await employee.save();
   console.log("Happy Happy Happy")
   res.status(201).send({"message":"New Employee created"});
  }
  catch(err)
  {
    console.log(err);
  res.status(500).send({"message":"Server Error"});
  }

})




