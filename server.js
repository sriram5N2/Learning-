const express=require('express');

const mongoose=require('mongoose');
const Employee=require('./models/Employee');
const employeeRoutes=require('./routes/employeeRoutes');

const ejs=require('ejs');
const User=require('./models/User');
const Usercontroller=require('./controllers/Usercontroller')

const app=express();

const PORT=3000;
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.set('view engine','ejs');

mongoose.connect("mongodb+srv://sriramt234:sriram1234@cluster0.ezqbeb2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('Mongodb connected succesfully')
}).catch((e)=>{
  console.log('Database Not Connected',e)
})

  
  // For mounting Purpose



app.get('/signup',(req,res)=>{
  res.render('signup',{title:"SignupPage"});
})

app.post('/signup',Usercontroller.CreateUser)

app.get('/login',(req,res)=>{
  res.render('login',{title:"LoginPage"});
})

app.get('/homepage',(req,res)=>{
  res.render('homepage',{title:"HomePage"});
})

//Just for checking the server is working or not 
app.get('/apple',(req,res)=>{
  console.log('apple url hitted');
  res.send("Apple")
})

app.use('/employees',employeeRoutes)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });

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




