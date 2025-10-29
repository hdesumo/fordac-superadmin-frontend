import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifySuperAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Token manquant ou invalide." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.superadmin = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Accès non autorisé." });
  }
};
