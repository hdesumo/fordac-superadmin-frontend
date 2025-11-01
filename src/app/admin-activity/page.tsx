"use client";

import { useEffect, useState } from "react";

interface Log {
  name: string;
  email: string;
  department: string;
  action: string;
  timestamp: string;
  ip_address: string;
}

export default function AdminActivityPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admins/activity`;

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setLogs(data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Activités des administrateurs
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl bg-white">
          <thead>
            <tr className="bg-green-700 text-white text-left">
              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Département</th>
              <th className="p-3">Action</th>
              <th className="p-3">Date & Heure</th>
              <th className="p-3">IP</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                  Aucune activité enregistrée.
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3">{log.name}</td>
                  <td className="p-3">{log.email}</td>
                  <td className="p-3">{log.department}</td>
                  <td className="p-3 font-semibold">
                    {log.action === "login" ? "Connexion" : "Déconnexion"}
                  </td>
                  <td className="p-3">
                    {new Date(log.timestamp).toLocaleString("fr-FR")}
                  </td>
                  <td className="p-3">{log.ip_address || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
