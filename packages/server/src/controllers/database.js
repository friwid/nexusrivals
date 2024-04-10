import mariadb from "mariadb";
import Sequelize from "sequelize";
import config from "../config/db.config.js";

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: "mariadb",
});

export default sequelize;
