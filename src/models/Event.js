import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Member = sequelize.define("member", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  membership_level: DataTypes.STRING,
});
