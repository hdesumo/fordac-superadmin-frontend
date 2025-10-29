"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    admins: 0,
    events: 0,
    members: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("superadmin_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/superadmin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Erreur de chargement des stats :", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Tableau de bord SuperAdmin" />
        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-gray-600 text-sm">Administrateurs</h3>
            <p className="text-3xl font-semibold text-green-700">
              {stats.admins}
            </p>
          </div>

          <div className="card">
            <h3 className="text-gray-600 text-sm">Événements publiés</h3>
            <p className="text-3xl font-semibold text-green-700">
              {stats.events}
            </p>
          </div>

          <div className="card">
            <h3 className="text-gray-600 text-sm">Membres enregistrés</h3>
            <p className="text-3xl font-semibold text-green-700">
              {stats.members}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
