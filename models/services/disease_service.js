import e from "express";
import db from "../entities/index.js"
import createError from "../../ultis/createError.js";
import { Op } from "sequelize";
export const createDiseaseService = async (name, info, statuses, diets) => {
    try {
        // Kiểm tra xem bệnh có tồn tại không
        const checkName = await db.disease.findOne({
            where: {
                name
            }
        });

        if (checkName) {
            throw createError(400, 'Bệnh đã tồn tại!');
        }

        // Bắt đầu một transaction
        const transaction = await db.sequelize.transaction();

        try {
            // Tạo mới bệnh
            const disease = await db.disease.create({
                name,
                info
            }, { transaction });

            // Thêm các trạng thái vào bệnh
            await disease.addStatuses(statuses, { transaction });

            // Thêm các chế độ dinh dưỡng vào bệnh
            await disease.addDiets(diets, { transaction });

            // Commit transaction nếu mọi thứ thành công
            await transaction.commit();

            return disease;
        } catch (error) {
            // Nếu có lỗi, rollback transaction
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const deleteDiseaseService = async(id)=>{
    try {
        const disease = await db.disease.findByPk(id)
        if(!disease) return createError(400, 'Bệnh không tồn tại!')
        const delete_disease = await db.disease.destroy({
            where : {id}
        })
        const deleted_status = await db.disease_status.destroy({
            where: {
                id: diseaseId
            }
        });
        
        if(delete_disease == 0) return createError(400, 'Xoá Bệnh không thành công!');
        if(deleted_status == 0) return createError(400, 'Xoá trạng thái không thành công!');
        return {
            message: 'Xoá thành công!'
        };
    } catch (error) {
        return error;
    }
}
export const getDiseasesAllService = async(name_disease)=>{
    try {
        const diseases = await db.disease.findAll({
            include:[
                {
                    model: db.status
                },
                {
                    model: db.diet
                }
            ],
        });
        if(diseases.length == 0) return createError(400, 'Không có Bệnh!')
        return diseases;
    } catch (error) {
        return error;
    }
}

export const getDiseasesByNameService = async(name_disease)=>{
    try {
        const diseases = await db.disease.findAll({
            include:[
                {
                    model:db.status,
                },
                {
                    model:db.diet,
                }
            ],
            where : {name : name_disease}
        });
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
                    where :name_status
                },
                {
                    model:db.diet,
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