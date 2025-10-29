import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const SuperAdmin = sequelize.define("superadmin", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  password: { type: DataTypes.STRING, allowNull: false },
});
