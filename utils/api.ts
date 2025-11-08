// utils/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Ex: https://api-superadmin.fordac-connect.org
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ ---- Requêtes génériques ----

// Récupération des admins
export const getAdmins = async () => {
  const res = await API.get("/api/superadmin/admins");
  return res.data;
};

// Création d’un admin
export const createAdmin = async (adminData: any) => {
  const res = await API.post("/api/superadmin/admins", adminData);
  return res.data;
};

// Suppression d’un admin
export const deleteAdmin = async (id: number) => {
  const res = await API.delete(`/api/superadmin/admins/${id}`);
  return res.data;
};

// Récupération du tableau de bord principal
export const getDashboardStats = async () => {
  const res = await API.get("/api/superadmin/dashboard");
  return res.data;
};

// 🔐 Connexion du superadmin
export const loginSuperAdminAPI = async (email: string, password: string) => {
  const res = await API.post("/api/auth/login", { email, password });
  return res.data;
};

// ✅ Export par défaut pour compatibilité
export default API;
