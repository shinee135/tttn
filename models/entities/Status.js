import { Sequelize, DataTypes } from "sequelize";

const Status = (sequelize) => sequelize.define('Status',{
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true,
  }, 
  name:{
    type: Sequelize.STRING,
  },
  createdAt: {
    type: DataTypes.DATE, 
      allowNull: false
},
}
)
export default Status;