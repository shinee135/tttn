import express from 'express'
// import { verifyjson } from '../middleware/jwt.js';
import {
     deleteDiet ,
     createDiet,
     updateDiet,
     getDietByName
} 
from '../controllers/diet_controller.js';

const routerDiet = express.Router()
routerDiet.post('/create', createDiet)
routerDiet.delete('/delete/:id',deleteDiet)
routerDiet.get('/get',getDietByName)
routerDiet.put('/update/:id',updateDiet)
export default routerDiet;