import express from 'express'
// import { verifyjson } from '../middleware/jwt.js';
import {
     deleteStatus ,
     createStatus,
     updateStatus,
     getStatus
} 
from '../controllers/status_controller.js';

const routerStatus = express.Router()
routerStatus.post('/create', createStatus)
routerStatus.delete('/delete/:id',deleteStatus)
routerStatus.get('/get',getStatus)
routerStatus.put('/update/:id',updateStatus)
export default routerStatus;