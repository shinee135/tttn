import e from "express";
import db from "../entities/index.js"
import createError from "../../ultis/createError.js";
import { Op } from "sequelize";
export const createStatusService = async(name, info) =>{
    try {
        const checkName = await db.status.findOne({
            where : {
                name
            }
        })
        if(checkName) return createError(400, 'Bệnh đã tồn tại!')
        const status = await db.status.create({
            name,
        })
        if(!status) return createError(400, 'Thêm bệnh không thành công!')
        return status;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteStatusService = async(id)=>{
    try {
        const status = await db.status.findByPk(id)
        if(!status) return createError(400, 'Bệnh không tồn tại!')
        const delete_status = await db.status.destroy({
            where : {id}
        })
        if(delete_status == 0) return createError(400, 'Xoá Bệnh không thành công!');
        return {
            message: 'Xoá thành công!'
        };
    } catch (error) {
        return error;
    }
}
export const getStatusService = async()=>{
    try {
        const status = await db.status.findAll({});
        if(status.length == 0) return createError(400, 'Không có Bệnh!')
        return status;
    } catch (error) {
        return error;
    }
}

export const getStatusByNameService = async(name_status)=>{
    try {
        const status = await db.status.findAll({where : {name : name_status}});
        if(status.length == 0) return createError(400, 'Không có Bệnh!')
        return status;
    } catch (error) {
        return error;
    }
}
export const updateStatusService = async(name,id)=>{
    try {
        const update_status = await db.status.update({
            name,
        }, {
            where : {
                id
            }
        })
        if(update_status[0] == 0) return createError(400, 'Chỉnh sửa không thành công!')
        return {
            status: true,
            message: 'Chỉnh sửa thành công !',
            update_status
        }
    } catch (error) {
        return error;   
    }
}