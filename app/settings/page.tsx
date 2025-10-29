"use client";

import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_BASE_URL}/api/superadmin/password`,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setSuccess("Mot de passe modifié avec succès ✅");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setError(res.data.error || "Une erreur est survenue.");
      }
    } catch (err: any) {
      setError("Échec de la mise à jour du mot de passe.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <Header title="Paramètres du SuperAdmin" />
        <div className="bg-white shadow rounded-lg p-6 max-w-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Changer le mot de passe
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Ancien mot de passe
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-700 text-sm">{success}</p>}

            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              Mettre à jour
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
