import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/db.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Vérification de connexion DB
pool.connect().then(() => console.log("✅ PostgreSQL prêt pour requêtes.")).catch(console.error);

// Routes principales
app.use("/api/superadmin", superAdminRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API SuperAdmin FORDAC opérationnelle." });
});

// Lancement du serveur
app.listen(process.env.PORT, () => {
  console.log(`🚀 Serveur SuperAdmin FORDAC sur le port ${process.env.PORT}`);
});
