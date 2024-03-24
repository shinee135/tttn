import e from "express";
import db from "../entities/index.js"
import createError from "../../ultis/createError.js";
import { Op } from "sequelize";
export const createBmiService = async(name) =>{
    try {
        const checkName = await db.bmi.findOne({
            where : {
                name
            }
        })
        if(checkName) return createError(400, 'Bmi đã tồn tại!')
        const Bmi = await db.bmi.create({
            name,
        })
        if(!Bmi) return createError(400, 'Thêm Bmi không thành công!')
        return Bmi;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteBmiService = async(id)=>{
    try {
        const Bmi = await db.bmi.findByPk(id)
        if(!Bmi) return createError(400, 'Bmi không tồn tại!')
        const delete_Bmi = await db.bmi.destroy({
            where : {id}
        })
        if(delete_Bmi == 0) return createError(400, 'Xoá Bmi không thành công!');
        return {
            message: 'Xoá thành công!'
        };
    } catch (error) {
        return error;
    }
}

export const getBmiByNameService = async(name_Bmi)=>{
    try {
        const Bmi = await db.bmi.findAll({where : {name : name_Bmi}});
        if(Bmi.length == 0) return createError(400, 'Không có Bmi!')
        return Bmi;
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const updateBmiService = async(name,id)=>{
    try {
        const update_Bmi = await db.bmi.update({
            name,
        }, {
            where : {
                id
            }
        })
        if(update_Bmi[0] == 0) return createError(400, 'Chỉnh sửa không thành công!')
        return {
            Bmi: true,
            message: 'Chỉnh sửa thành công !',
            update_Bmi
        }
    } catch (error) {
        return error;   
    }
}