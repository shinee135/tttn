import express from 'express'
import { 
    loginController, 
    registerController,
    logoutController
} from "../controllers/auth_controller.js";

const routerAuth = express.Router()
routerAuth.post('/register', registerController)
routerAuth.post('/login', loginController)
routerAuth.post('/logout', logoutController)
export default routerAuth;