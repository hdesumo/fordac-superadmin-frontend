// =======================================
// 🧩 SuperAdmin Controller - FORDAC
// =======================================

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

// Clé secrète pour signer les tokens (doit être dans .env)
const JWT_SECRET = process.env.JWT_SECRET || "fordac-secret-key";

// ==========================
// 🔐 Connexion SuperAdmin
// ==========================
export const loginSuperAdmin = async (req, res) => {
  try {
    const { password } = req.body;

    // Vérifie que le mot de passe est bien fourni
    if (!password) {
      return res.status(400).json({ error: "Le mot de passe est requis." });
    }

    // Récupère le SuperAdmin
    const result = await pool.query("SELECT * FROM superadmin WHERE username = $1", ["superadmin"]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "SuperAdmin introuvable." });
    }

    const superadmin = result.rows[0];

    // Vérifie le mot de passe
    const validPassword = await bcrypt.compare(password, superadmin.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    // Génère un token JWT
    const token = jwt.sign(
      { id: superadmin.id, role: "superadmin" },
      JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Connexion réussie.",
      token,
    });
  } catch (err) {
    console.error("❌ Erreur lors de la connexion :", err.message);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// ==========================
// 🔁 Changer le mot de passe
// ==========================
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Les deux mots de passe sont requis." });
    }

    const result = await pool.query("SELECT * FROM superadmin WHERE username = $1", ["superadmin"]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "SuperAdmin introuvable." });
    }

    const superadmin = result.rows[0];

    const isValid = await bcrypt.compare(currentPassword, superadmin.password);
    if (!isValid) {
      return res.status(401).json({ error: "Mot de passe actuel incorrect." });
    }

    const hashedNew = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE superadmin SET password = $1 WHERE username = $2", [hashedNew, "superadmin"]);

    res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (err) {
    console.error("❌ Erreur lors du changement de mot de passe :", err.message);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// ==========================
// 🧾 Vérification du token
// ==========================
export const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token manquant." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ valid: false, error: "Token invalide ou expiré." });
  }
};
