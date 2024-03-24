import configdb from "../../dbconfig/db.config.js";
import { Sequelize } from "sequelize";
import User from "./User.js";
import Role from "./Role.js";
import Disease from "./Disease.js";
import Status from "./Status.js";
import Diet from "./Diet.js";
import Bmi from "./Bmi.js";
import User_bmi from "./User_bmi.js";


const sequelize = new Sequelize(
    configdb.DB,
    configdb.USER,
    configdb.PASSWORD,
    {
      host: configdb.HOST,
      dialect: configdb.dialect,
      operatorsAliases: 0,
  
      pool: {
        max: configdb.pool.max,
        min: configdb.pool.min,
        acquire: configdb.pool.acquire,
        idle: configdb.pool.idle
      },
      logging: false
    }
);

const db = {}
db.sequelize = sequelize
db.user = User(sequelize)
db.role = Role(sequelize)
db.disease = Disease(sequelize)
db.status = Status(sequelize)
db.diet = Diet(sequelize)
db.bmi = Bmi(sequelize)
db.user_bmi = User_bmi(sequelize)

db.disease.belongsToMany(db.status, {
  through: 'Disease_status',
})
db.status.belongsToMany(db.disease, {
  through: 'Disease_status'
})

db.bmi.belongsToMany(db.user,{
  through: 'User_bmi'
})
db.user.belongsToMany(db.bmi,{
  through: 'User_bmi'
})

db.disease.belongsToMany(db.diet, {
  through: 'Diet_disease',
})
db.diet.belongsToMany(db.disease, {
  through: 'Diet_disease'
})
export default db;
