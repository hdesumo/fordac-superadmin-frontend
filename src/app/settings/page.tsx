"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [message, setMessage] = useState("");

  const API_URL = "https://api-superadmin.fordac-connect.org/api/superadmin/change-password";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (passwords.newPass !== passwords.confirm) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const token = localStorage.getItem("superadmin_token");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        oldPassword: passwords.current,
        newPassword: passwords.newPass,
      }),
    });

    if (res.ok) setMessage("Mot de passe modifié avec succès !");
    else setMessage("Erreur lors de la modification.");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Paramètres & Sécurité</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow max-w-lg mx-auto space-y-4"
      >
        <input
          type="password"
          placeholder="Mot de passe actuel"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={passwords.newPass}
          onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={passwords.confirm}
          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
          className="w-full border p-3 rounded"
          required
        />

        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg">
          Mettre à jour
        </button>

        {message && <p className="text-center text-green-700 font-medium mt-4">{message}</p>}
      </form>
    </main>
  );
}
