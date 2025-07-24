const express=require('express');
const PORT=3000;
const dotenv=require('dotenv');
const {MongoClient}=require('mongodb')
const app=express();
dotenv.config()
MongoClient.connect("mongodb+srv://sriramt234:sriram1234@backend.3tlxoc0.mongodb.net/?retryWrites=true&w=majority&appName=BACKEND")
.then(()=>{
    console.log('Mongodb connected succesfully')
}).catch((e)=>{
  console.log('Database Not Connected')
})

app.listen(PORT,()=>{
    console.log('server started running');
})