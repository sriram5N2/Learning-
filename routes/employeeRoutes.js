const express=require('express')
const router=express.Router()
const EmployeeController=require('../controllers/Employeecontroller');


router.post('/add-emp',EmployeeController.CreateEmployee)

router.get('/all-emp',EmployeeController.GetallEmployees)


module.exports=router;