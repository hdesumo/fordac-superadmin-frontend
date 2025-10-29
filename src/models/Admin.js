import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Admin = sequelize.define("admin", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING, defaultValue: "event-admin" },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
});
