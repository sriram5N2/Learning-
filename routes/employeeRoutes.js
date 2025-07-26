const express=require('express')
const router=express.Router()
const EmployeeController=require('../controllers/Employeecontroller');


router.post('/add-emp',EmployeeController.CreateEmployee);

router.get('/all-emp',EmployeeController.GetallEmployees);

router.put('/update-emp/:id',EmployeeController.UpdateEmployee);

router.delete('/delete-emp/:id',EmployeeController.DeleteEmployee)

module.exports=router;