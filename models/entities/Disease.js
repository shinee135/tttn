import { Sequelize, DataTypes } from "sequelize";

const Disease = (sequelize) => sequelize.define('Disease',{
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true,
  }, 
  name:{
    type: Sequelize.STRING,
  },
  info: {
    type: Sequelize.STRING,
  }, 
  createdAt: {
    type: DataTypes.DATE, 
      allowNull: false
},
}
)
export default Disease;
