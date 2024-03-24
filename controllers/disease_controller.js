import { Op } from "sequelize";
import { 
    createDiseaseService, 
    deleteDiseaseService, 
    getDiseasesByNameService, 
    getDiseasesAllService,
    updateDiseaseService,
    getDiseasesByStatusService
    } 
from "../models/services/disease_service.js";
import createError from "../ultis/createError.js"

export const createDisease = async(req, res, next) =>{
    try {
        
        // if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const data = req.body;
        const { name, info, statuses ,diets} = data;
        

        // // Tạo mảng promises cho mỗi trạng thái và chế độ dinh dưỡng
        // const statusPromises = statuses.map(status => createDiseaseService(name, info, status, diets));
        // const dietPromises = diets.map(diet => createDiseaseService(name, info, statuses, diet));

        // // Gộp hai mảng promises lại thành một mảng duy nhất
        // const allPromises = statusPromises.concat(dietPromises);

        // // Chờ tất cả các promise hoàn thành
        // const results = await Promise.all(allPromises);

        // // Xử lý kết quả
        // const disease = results.filter(result => !(result instanceof Error));

        const disease = await createDiseaseService(data.name, data.info,data.statuses, data.diets);

        if (!Array.isArray(statuses) || !Array.isArray(diets)) {
            return next(createError(400, 'Các trạng thái và chế độ dinh dưỡng phải được cung cấp dưới dạng mảng.'));
        }
        if(disease instanceof Error) return next(disease)
        if (disease.length === 0) {
            // Nếu không có bệnh nào được tạo thành công
            return next(createError(400, 'Không thể tạo bất kỳ bệnh nào.'));
        }
        res.status(200).send(disease);;
    } catch (error) {
        next(error)
    }
}
export const getDiseasesAll = async(req, res, next) =>{
    try {
        const data = req.body;
        const diseases = await getDiseasesAllService();
        if(diseases instanceof Error) return next(diseases);
        res.status(200).send(diseases);
    } catch (error) {
        next(error)
    }
}

export const getDiseasesByName = async(req, res, next) =>{
    try {
        const data = req.body;
        const q = req.query;
        
        const name_disease = {
            ...(q.name_disease && {name : {
                [Op.like]: `%${q.name_disease}%`,
            }}),
        }
        const diseases = await getDiseasesByNameService(name_disease);
        if(diseases instanceof Error) return next(diseases);
        res.status(200).send(diseases);
    } catch (error) {
        next(error)
    }
}
export const getDiseasesByStatus = async(req, res, next) =>{
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