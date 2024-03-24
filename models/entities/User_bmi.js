import { Sequelize, DataTypes } from "sequelize";
const User_bmi = (sequelize) => sequelize.define('User_bmi', {
    createdAt: {
        type: DataTypes.DATE, 
          allowNull: false
    },
})


export default User_bmi;