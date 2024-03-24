import express from 'express'
// import { verifyjson } from '../middleware/jwt.js';
import {
     deleteBmi ,
     createBmi,
     updateBmi,
     getBmiByName
} 
from '../controllers/bmi_controller.js';

const routerBmi = express.Router()
routerBmi.post('/create', createBmi)
routerBmi.delete('/delete/:id',deleteBmi)
routerBmi.get('/get',getBmiByName)
routerBmi.put('/update/:id',updateBmi)
export default routerBmi;