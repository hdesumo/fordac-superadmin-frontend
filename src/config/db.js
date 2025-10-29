import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: false,
});

pool
  .connect()
  .then(() => console.log("✅ Connecté à PostgreSQL (SuperAdmin API)"))
  .catch((err) => console.error("❌ Erreur PostgreSQL :", err.message));
