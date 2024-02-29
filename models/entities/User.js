import { Sequelize, DataTypes } from "sequelize";

const User = (sequelize) => sequelize.define('User',{
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  age: {
    type:Sequelize.INTEGER,
  },
  number: {
    type:Sequelize.INTEGER,
  }, 
  address: {
    type: Sequelize.STRING,
  }, 
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },   
  // role: {
  //   type: Sequelize.ENUM("admin", "customer"),
  //   allowNull: false,
  // },
  height: {
    type: Sequelize.INTEGER,
  },
  weight: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE, 
      allowNull: false
},
}
)
export default User;
