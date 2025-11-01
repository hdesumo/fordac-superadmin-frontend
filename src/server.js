import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Vérification connexion DB
pool
  .connect()
  .then((client) => {
    console.log("✅ Connecté à PostgreSQL");
    client.release();
  })
  .catch((err) => {
    console.error("❌ Erreur PostgreSQL :", err.message);
  });

// Routes API
app.use("/api", superAdminRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l’API SuperAdmin FORDAC", version: "1.0.0" });
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur SuperAdmin démarré sur le port ${PORT}`);
});
