import { 
    createBmiService, 
    deleteBmiService, 
    getBmiByNameService, 
    updateBmiService 
    } 
from "../models/services/bmi_service.js";
import createError from "../ultis/createError.js"

export const createBmi = async(req, res, next) =>{
    try {
        
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const data = req.body;
        const bmi = await createBmiService(data.name);
        if(bmi instanceof Error) return next(bmi);
        res.bmi(200).send(bmi);
    } catch (error) {
        next(error)
    }
}

export const getBmiByName = async(req, res, next) =>{
    try {
        const data = req.body;
        const bmi = await getBmiByNameService(data.name);
        if(bmi instanceof Error) return next(bmi);
        res.status(200).send(bmi);
        console.log(error);
    } catch (error) {
        next(error)
    }
}
export const updateBmi = async(req, res, next) =>{
    try {
        const id = req.params.id;
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        if(!id) return next(createError(400, 'Không tìm thấy'))
        const data = req.body;
        const update_bmi = await updateBmiService(data.name,id)
        if(update_bmi instanceof Error) return next(update_bmi);
        res.status(200).send(update_bmi);
    } catch (error) {
        next(error)   
    }
}
export const deleteBmi = async(req, res, next) =>{
    try {
        const id = req.params.id;
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        if(!id) return next(createError(400, 'Không tìm thấy!'))
        const delete_bmi = await deleteBmiService(id)
        if(delete_bmi instanceof Error) return next(delete_bmi);
        res.bmi(200).send(delete_bmi);
    } catch (error) {
        next(error)
    }
}