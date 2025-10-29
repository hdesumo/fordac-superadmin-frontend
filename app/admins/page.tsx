"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  // Charger tous les administrateurs
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/admins`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des administrateurs.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // Ajouter un nouvel administrateur
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE_URL}/api/admins/create`, newAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins([...admins, res.data]);
      setNewAdmin({ name: "", email: "", password: "", role: "admin" });
    } catch (err) {
      setError("Erreur lors de la création d’un nouvel administrateur.");
    }
  };

  // Supprimer un administrateur
  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet administrateur ?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(admins.filter((a) => a.id !== id));
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <Header title="Gestion des administrateurs" />
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Liste des administrateurs */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Liste des administrateurs</h2>
              {error && <p className="text-red-600">{error}</p>}
              <table className="w-full text-sm border">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="py-2 px-3 text-left">Nom</th>
                    <th className="py-2 px-3 text-left">Email</th>
                    <th className="py-2 px-3 text-left">Rôle</th>
                    <th className="py-2 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id} className="border-t hover:bg-gray-50">
                      <td className="py-2 px-3">{admin.name}</td>
                      <td className="py-2 px-3">{admin.email}</td>
                      <td className="py-2 px-3">{admin.role}</td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Formulaire d’ajout */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Ajouter un administrateur</h2>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="admin">Administrateur standard</option>
                  <option value="event-admin">Admin Événements</option>
                  <option value="news-admin">Admin Actualités</option>
                  <option value="member-admin">Admin Adhésions</option>
                </select>
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
