import { Op } from "sequelize"
import db from "../entities/index.js"
import dotenv from 'dotenv'
import createError from "../../ultis/createError.js"
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import e from "express"

dotenv.config()
export const loginService = async (email, password) => {
    try {
        const checkEmail = await db.user.findOne({          
            where: { email }
        });     
        if (!checkEmail) return createError(400, "Tài khoản không chính xác!");
        
        if (checkEmail.password) {
            const checkPass = await argon2.verify(checkEmail.password, password);
            if (!checkPass) return createError(400, "Mật khẩu không chính xác!");
        } else {
            return createError(400, "Mật khẩu không tồn tại!");
        }
        const user = await db.user.findOne({
            where: { email },
            include:[
                {
                    model:db.bmi,
                }
            ],
            attributes: { exclude: ['password'] }
        }); 
        const token = jwt.sign({
            id: user.id,
            idRole: user.role_id
        }, process.env.JWT_KEY);
        
        return {
            token,
            user
        };
        
    } catch (error) {
        return error;
    }
    
} 


export const registerService = async (name, email, password, confirmPassword, number, address, age ) =>{
    try {
        const user = await db.user.findOne({
            where : { email }
        })
        if(user) return createError(400, "Email đã tồn tại!")
        if(password !== confirmPassword) return createError(400, 'Mật khẩu nhập lại không chính xác !')
        if(password.length < 6) return createError(400, 'Mật khẩu phải lớn hơn 6 chữ !')
        const hashPass = await argon2.hash(password)
        const isCustomer = await db.role.findOne({
            where: {
                name: 'Customer'
            }
        })
        if (!isCustomer) {
            throw createError(400, 'Không tìm thấy vai trò "Customer" trong cơ sở dữ liệu');
        } else 
        {
            console.log(isCustomer.id)
            
        }
        const NewUser = await db.user.create({
            name,
            email,
            number,
            address,
            age,
            password : hashPass,            
            role_id : isCustomer.id,
        })

        return NewUser;
    } catch (error) {
        console.log(error);
    }
}