"use client";

import axios from "axios";
import { toast } from "react-hot-toast";

/**
 * ✅ Instance Axios configurée
 */
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ✅ Connexion du SuperAdmin
 */
export const loginSuperAdmin = async (email: string, password: string) => {
  try {
    const response = await API.post("/auth/login", { email, password });

    if (response.status === 200 && response.data.token) {
      // Stocke le token localement
      localStorage.setItem("token", response.data.token);
      toast.success("Connexion réussie 🎉");
      return response.data;
    } else {
      toast.error("Identifiants incorrects ou réponse inattendue du serveur.");
      return null;
    }
  } catch (error: any) {
    console.error("Erreur loginSuperAdmin:", error.message);
    toast.error("Impossible de se connecter. Vérifie tes identifiants.");
    return null;
  }
};

/**
 * ✅ Déconnexion du SuperAdmin
 */
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    toast("Déconnexion réussie 👋");
    window.location.href = "/login";
  }
};

/**
 * ✅ Récupère le token stocké
 */
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

/**
 * ✅ Vérifie si un utilisateur est authentifié
 */
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};
