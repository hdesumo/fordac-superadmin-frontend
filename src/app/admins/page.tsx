"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { apiFetch } from "@/lib/api"; // ✅ notre helper sécurisé

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  created_at: string;
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admins`;

  // 🔄 Charger les administrateurs existants
  const fetchAdmins = async () => {
    try {
      const res = await apiFetch(API_URL);
      if (!res.ok) throw new Error("Erreur HTTP");
      const data = await res.json();
      setAdmins(data);
    } catch (error) {
      console.error("Erreur chargement admins :", error);
      toast.error("Erreur lors du chargement des administrateurs");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // ➕ Ajouter un administrateur
  const handleAddAdmin = async () => {
    if (!name || !email || !role || !department) {
      toast.error("Tous les champs sont requis !");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ name, email, role, department }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Erreur HTTP");
      }

      toast.success("Administrateur ajouté avec succès !");
      setName("");
      setEmail("");
      setRole("");
      setDepartment("");
      await fetchAdmins();
    } catch (error) {
      console.error("Erreur création admin :", error);
      toast.error("Erreur lors de la création de l’administrateur.");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Supprimer un administrateur
  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet administrateur ?")) return;
    try {
      const res = await apiFetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur HTTP");
      toast.success("Administrateur supprimé !");
      await fetchAdmins();
    } catch (error) {
      console.error("Erreur suppression admin :", error);
      toast.error("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="p-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Gestion des Administrateurs
      </h1>

      {/* Formulaire d’ajout */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 text-green-900">
          Créer un nouvel administrateur
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Nom complet"
            className="border border-gray-300 p-3 rounded-md flex-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-md flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Rôle"
            className="border border-gray-300 p-3 rounded-md flex-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            type="text"
            placeholder="Département"
            className="border border-gray-300 p-3 rounded-md flex-1"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button
            onClick={handleAddAdmin}
            disabled={loading}
            className={`bg-green-700 text-white px-6 py-3 rounded-md font-medium hover:bg-green-800 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Ajout..." : "Ajouter"}
          </button>
        </div>
      </div>

      {/* Liste des administrateurs */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl bg-white">
          <thead>
            <tr className="bg-green-700 text-white text-left">
              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rôle</th>
              <th className="p-3">Département</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Aucun administrateur enregistré.
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{admin.name}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3">{admin.role}</td>
                  <td className="p-3">{admin.department}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
