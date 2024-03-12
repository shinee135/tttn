import e from "express";
import db from "../entities/index.js"
import createError from "../../ultis/createError.js";
import { Op } from "sequelize";
export const createDiseaseService = async(name, info) =>{
    try {
        const checkName = await db.disease.findOne({
            where : {
                name
            }
        })
        if(checkName) return createError(400, 'Bệnh đã tồn tại!')
        const disease = await db.disease.create({
            name,
            info,
        })
        if(!disease) return createError(400, 'Thêm bệnh không thành công!')
        return disease;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteDiseaseService = async(id)=>{
    try {
        const disease = await db.disease.findByPk(id)
        if(!disease) return createError(400, 'Bệnh không tồn tại!')
        const delete_disease = await db.disease.destroy({
            where : {id}
        })
        if(delete_disease == 0) return createError(400, 'Xoá Bệnh không thành công!');
        return {
            message: 'Xoá thành công!'
        };
    } catch (error) {
        return error;
    }
}

export const getDiseasesService = async(name_disease)=>{
    try {
        const diseases = await db.disease.findAll({where : {name : name_disease}});
        if(diseases.length == 0) return createError(400, 'Không có Bệnh!')
        return diseases;
    } catch (error) {
        return error;
    }
}
export const getDiseasesByStatusService = async(name_status)=>{
    try {
        const diseases = await db.disease.findAll({
            include:[
                {
                    model:db.status,
                    where : name_status
                }
            ],

        });
        if(diseases.length == 0) return createError(400, 'Không có Bệnh!')
        return diseases;
    } catch (error) {
        console.log(error)
    }
}
export const updateDiseaseService = async(name,info,id)=>{
    try {
        const update_disease = await db.disease.update({
            name,
            info
        }, {
            where : {
                id
            }
        })
        if(update_disease[0] == 0) return createError(400, 'Chỉnh sửa không thành công!')
        return {
            status: true,
            message: 'Chỉnh sửa thành công !',
            update_disease
        }
    } catch (error) {
        return error;   
    }
}