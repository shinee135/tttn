import e from "express";
import db from "../entities/index.js"
import createError from "../../ultis/createError.js";
import { Op } from "sequelize";
export const createDietService = async(name) =>{
    try {
        const checkName = await db.diet.findOne({
            where : {
                name
            }
        })
        if(checkName) return createError(400, 'Diet đã tồn tại!')
        const Diet = await db.diet.create({
            name,
        })
        if(!Diet) return createError(400, 'Thêm Diet không thành công!')
        return Diet;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteDietService = async(id)=>{
    try {
        const Diet = await db.diet.findByPk(id)
        if(!Diet) return createError(400, 'Diet không tồn tại!')
        const delete_Diet = await db.diet.destroy({
            where : {id}
        })
        if(delete_Diet == 0) return createError(400, 'Xoá Diet không thành công!');
        return {
            message: 'Xoá thành công!'
        };
    } catch (error) {
        return error;
    }
}

export const getDietByNameService = async(name_Diet)=>{
    try {
        const Diet = await db.diet.findAll({where : {name : name_Diet}});
        if(Diet.length == 0) return createError(400, 'Không có Diet!')
        return Diet;
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const updateDietService = async(name,id)=>{
    try {
        const update_Diet = await db.diet.update({
            name,
        }, {
            where : {
                id
            }
        })
        if(update_Diet[0] == 0) return createError(400, 'Chỉnh sửa không thành công!')
        return {
            Diet: true,
            message: 'Chỉnh sửa thành công !',
            update_Diet
        }
    } catch (error) {
        return error;   
    }
}