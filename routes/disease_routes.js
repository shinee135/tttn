import express from 'express'
// import { verifyjson } from '../middleware/jwt.js';
import {
     deleteDisease ,
     createDisease,
     updateDisease,
     getDiseases,
     getDiseasesStatus
} 
from '../controllers/disease_controller.js';

const routerDisease = express.Router()
routerDisease.post('/create', createDisease)
routerDisease.delete('/delete/:id',deleteDisease)
routerDisease.get('/get',getDiseases)
routerDisease.put('/update/:id',updateDisease)
routerDisease.get('/search',getDiseasesStatus)
export default routerDisease;