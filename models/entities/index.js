import configdb from "../../dbconfig/db.config.js";
import { Sequelize } from "sequelize";
import User from "./User.js";
import Role from "./Role.js";
import Disease from "./Disease.js";
import Status from "./Status.js";


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
db.disease.belongsToMany(db.status, {
  through: 'Disease_status',
})
db.status.belongsToMany(db.disease, {through: 'Disease_status'})

export default db;
