import express from 'express'

import {
    updateUser
}
from "../controllers/user_controller.js"

const routerUser = express.Router();
routerUser.put('/update/:id',updateUser)
export default routerUser;