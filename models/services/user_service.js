import e from "express";
import db from "../entities/index.js"
import createError from "../../ultis/createError.js";
import { Op } from "sequelize";

// Hàm tính chỉ số BMI
function calculateBMI(height, weight) {
    return weight / ((height/100) * (height/100));
}

// Hàm xác định danh mục BMI
function getBMICategory(bmi) {
    if (bmi < 18.5) return 1;
    else if (bmi < 24.9) return 2;
    else if (bmi < 29.9) return 3;
    else if (bmi < 34.9) return 4;
    else return 5;
}

export const updateUserService = async (height,weight, id) =>{
    try {
        const userUpdate = await db.user.update({height : height,weight : weight}, {
            where: {id}
        })
        if(!userUpdate || userUpdate[0] == 0) return createError(400, 'Update không thành công!')
        // Lấy thông tin người dùng sau khi cập nhật
        const user = await db.user.findOne({ where: { id } });

        // Tính chỉ số BMI mới dựa trên thông tin cập nhật
        const bmi_count = calculateBMI(user.height, user.weight);

        // Xác định danh mục BMI mới
        const bmiCategory = getBMICategory(bmi_count);

        console.log(bmiCategory)
        console.log(user.id)
        // Lấy hoặc tạo thông tin BMI của người dùng
        let userBMI = await db.user_bmi.findOne({ where: { UserId: user.id } });
        if (!userBMI) {
            userBMI = await db.user_bmi.create({
                UserId: user.id,
                BmiId: bmiCategory
            });
        } else {
            // Nếu đã có thông tin BMI, cập nhật
            await db.user_bmi.update(
                { BmiId: bmiCategory },
                { where: { UserId: user.id } }
            );
        }

        return {
            status: true,
            messgae: 'Update thanh cong!'
        };  
    } catch (error) {
        console.log(error)
        return error;
    }
}