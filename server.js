const express=require('express');
const PORT=3000;

const {MongoClient}=require('mongodb');
const employeeRoutes=require('./routes/employeeRoutes')
const app=express();

app.use(express.json());


MongoClient.connect("mongodb+srv://sriramt234:sriram1234@cluster0.ezqbeb2.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('Mongodb connected succesfully')





}).catch((e)=>{
  console.log('Database Not Connected',e)
})

  // Mount routes AFTER DB is connected
  app.use('/employees', employeeRoutes);

  // Start server AFTER successful DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
