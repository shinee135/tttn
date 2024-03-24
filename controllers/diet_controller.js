import { 
    createDietService, 
    deleteDietService, 
    getDietByNameService, 
    updateDietService 
    } 
from "../models/services/diet_service.js";
import createError from "../ultis/createError.js"

export const createDiet = async(req, res, next) =>{
    try {
        
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const data = req.body;
        const diet = await createDietService(data.name);
        if(diet instanceof Error) return next(diet);
        res.status(200).send(diet);
    } catch (error) {
        next(error)
    }
}

export const getDietByName = async(req, res, next) =>{
    try {
        const data = req.body;
        const diet = await getDietByNameService(data.name);
        if(diet instanceof Error) return next(diet);
        res.status(200).send(diet);
        console.log(error);
    } catch (error) {
        next(error)
    }
}
export const updateDiet = async(req, res, next) =>{
    try {
        const id = req.params.id;
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        if(!id) return next(createError(400, 'Không tìm thấy'))
        const data = req.body;
        const update_diet = await updateDietService(data.name,id)
        if(update_diet instanceof Error) return next(update_diet);
        res.status(200).send(update_diet);
    } catch (error) {
        next(error)   
    }
}
export const deleteDiet = async(req, res, next) =>{
    try {
        const id = req.params.id;
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        if(!id) return next(createError(400, 'Không tìm thấy bệnh!'))
        const delete_diet = await deleteDietService(id)
        if(delete_diet instanceof Error) return next(delete_diet);
        res.status(200).send(delete_diet);
    } catch (error) {
        next(error)
    }
}