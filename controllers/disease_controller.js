import { Op } from "sequelize";
import { 
    createDiseaseService, 
    deleteDiseaseService, 
    getDiseasesService, 
    updateDiseaseService,
    getDiseasesByStatusService
    } 
from "../models/services/disease_service.js";
import createError from "../ultis/createError.js"

export const createDisease = async(req, res, next) =>{
    try {
        
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const data = req.body;
        const disease = await createDiseaseService(data.name, data.info);
        if(disease instanceof Error) return next(disease);
        res.status(200).send(disease);
    } catch (error) {
        next(error)
    }
}

export const getDiseases = async(req, res, next) =>{
    try {
        const data = req.body;
        const diseases = await getDiseasesService(data.name);
        if(diseases instanceof Error) return next(diseases);
        res.status(200).send(diseases);
    } catch (error) {
        next(error)
    }
}
export const getDiseasesStatus = async(req, res, next) =>{
    try {
        const q = req.query;
        
        const status = {
            ...(q.status && {name : {
                [Op.like]: `%${q.status}%`,
            }}),
        }
        const data = req.body;
        const diseases = await getDiseasesByStatusService(status);
        if(diseases instanceof Error) return next(diseases);
        res.status(200).send(diseases);
    } catch (error) {
        next(error)
    }
}
export const updateDisease = async(req, res, next) =>{
    try {
        const id = req.params.id;
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        if(!id) return next(createError(400, 'Không tìm thấy'))
        const data = req.body;
        const update_disease = await updateDiseaseService(data.name, data.info,id)
        if(update_disease instanceof Error) return next(update_disease);
        res.status(200).send(update_disease);
    } catch (error) {
        next(error)   
    }
}
export const deleteDisease = async(req, res, next) =>{
    try {
        const id = req.params.id;
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        if(!id) return next(createError(400, 'Không tìm thấy bệnh!'))
        const delete_disease = await deleteDiseaseService(id)
        if(delete_disease instanceof Error) return next(delete_disease);
        res.status(200).send(delete_disease);
    } catch (error) {
        next(error)
    }
}