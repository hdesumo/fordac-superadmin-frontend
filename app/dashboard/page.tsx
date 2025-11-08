"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import StatsCards from "@/components/StatsCards";
import ActivityChart from "@/components/ActivityChart";
import AuthGuard from "@/components/AuthGuard";
import { getDashboardStats } from "@/utils/api";
import { logout } from "@/utils/auth";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Chargement du tableau de bord...
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        {/* ✅ Barre latérale persistante */}
        <Sidebar />

        {/* ✅ Contenu principal */}
        <main className="flex-1 p-6 bg-gray-50">
          <TopHeader
            adminName="SuperAdmin"
            onLogout={logout} // 🔒 utilise la fonction unifiée
          />

          <div className="max-w-6xl mx-auto space-y-6">
            {/* ✅ Statistiques principales */}
            <StatsCards stats={stats} />

            {/* ✅ Graphique d’activités si présent */}
            {stats?.activities && <ActivityChart data={stats.activities} />}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
