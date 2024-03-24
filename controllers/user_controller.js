import {
    updateUserService
}
from "../models/services/user_service.js"

export const updateUser = async(req, res, next) =>{
    try {
        const id = req.params.id;
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        if(!id) return next(createError(400, 'Không tìm thấy'))
        const data = req.body;
        const update_user = await updateUserService(data.height,data.weight,id)
        if(update_user instanceof Error) return next(update_user);
        res.status(200).send(update_user);
    } catch (error) {
        next(error)   
    }
}