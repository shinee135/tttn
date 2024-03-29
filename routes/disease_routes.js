import express from 'express'
// import { verifyjson } from '../middleware/jwt.js';
import {
     deleteDisease ,
     createDisease,
     updateDisease,
     getDiseasesByName,
     getDiseasesAll,
     getDiseasesByStatus,
     getDiseasesById
} 
from '../controllers/disease_controller.js';

const routerDisease = express.Router()
routerDisease.post('/create', createDisease)
routerDisease.delete('/delete/:id',deleteDisease)
routerDisease.get('/get',getDiseasesAll)
routerDisease.get('/searchByName',getDiseasesByName)
routerDisease.put('/update/:id',updateDisease)
routerDisease.get('/searchByStatus',getDiseasesByStatus)
routerDisease.get('/searchById/:id',getDiseasesById)
export default routerDisease;