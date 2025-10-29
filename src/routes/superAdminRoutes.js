import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../config/db.js";

dotenv.config();

const router = express.Router();

// ==============================
// 🔐 Connexion SuperAdmin
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Le mot de passe est requis." });
    }

    const result = await pool.query("SELECT * FROM superadmin LIMIT 1");
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "SuperAdmin introuvable." });
    }

    const superadmin = result.rows[0];
    const isValid = await bcrypt.compare(password, superadmin.password);
    if (!isValid) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    const token = jwt.sign({ id: superadmin.id, role: "superadmin" }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (err) {
    console.error("Erreur login SuperAdmin:", err.message);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// ==============================
// 🔁 Changer le mot de passe
// ==============================
router.post("/change-password", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Les deux mots de passe sont requis." });
    }

    const result = await pool.query("SELECT * FROM superadmin LIMIT 1");
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Compte introuvable." });
    }

    const admin = result.rows[0];
    const isValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isValid) {
      return res.status(401).json({ error: "Mot de passe actuel incorrect." });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE superadmin SET password=$1 WHERE id=$2", [newHash, admin.id]);

    res.status(200).json({ message: "Mot de passe modifié avec succès." });
  } catch (err) {
    console.error("Erreur changement mot de passe:", err.message);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// ==============================
// 📊 Statistiques globales
// ==============================
router.get("/stats", async (req, res) => {
  try {
    const admins = await pool.query("SELECT COUNT(*) FROM admins");
    const events = await pool.query("SELECT COUNT(*) FROM events");
    const members = await pool.query("SELECT COUNT(*) FROM members");

    res.json({
      admins: parseInt(admins.rows[0].count, 10) || 0,
      events: parseInt(events.rows[0].count, 10) || 0,
      members: parseInt(members.rows[0].count, 10) || 0,
    });
  } catch (err) {
    console.error("Erreur stats:", err.message);
    res.status(500).json({ error: "Erreur lors du calcul des statistiques." });
  }
});

export default router;
