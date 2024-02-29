import { Op } from "sequelize"
import db from "../entities/index.js"
import dotenv from 'dotenv'
import createError from "../../ultis/createError.js"
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

dotenv.config()
export const loginService = async (email, password) => {
    try {
        const checkEmail = await db.user.findOne({
            where: { email },
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
            attributes: { exclude: ['password'] }
        }); 
        const token = jwt.sign({
            id: user.id,
            // idRole: user.RoleId
        }, process.env.JWT_KEY);
        
        return {
            token,
            user
        };
        
    } catch (error) {
        return error;
    }
    
} 
export const registerService = async (name, email, password, confirmPassword, number, address, age,height,weight ) =>{
    try {
        const user = await db.user.findOne({
            where : { email }
        })
        if(user) return createError(400, "Email đã tồn tại!")
        if(password !== confirmPassword) return createError(400, 'Mật khẩu nhập lại không chính xác !')
        if(password.length < 6) return createError(400, 'Mật khẩu phải lớn hơn 6 chữ !')
        const hassPass = await argon2.hash(password)
        // const Customer_id = 2;
        const UserLogin = await db.user.create({
            name,
            email,
            number,
            address,
            age,
            password : hassPass,
            // role_id : isCustomer.id,
            height,
            weight
        })
        return UserLogin;
    } catch (error) {
        console.log(error);
    }
}