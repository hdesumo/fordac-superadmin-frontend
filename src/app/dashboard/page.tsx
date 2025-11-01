"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, LogOut, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });
  const [error, setError] = useState("");

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://api-superadmin.fordac-connect.org";
  const token = typeof window !== "undefined" ? localStorage.getItem("superadmin_token") : null;

  // Vérification du token
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [router]);

  // Récupération admins + events
  const fetchData = async () => {
    try {
      setLoading(true);

      const [adminsRes, eventsRes] = await Promise.all([
        fetch(`${apiUrl}/api/admins`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${apiUrl}/api/events`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const adminsData = adminsRes.ok ? await adminsRes.json() : [];
      const eventsData = eventsRes.ok ? await eventsRes.json() : [];

      setAdmins(adminsData);
      setEvents(eventsData);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les données.");
    } finally {
      setLoading(false);
    }
  };

  // Création d’un nouvel événement
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) {
      setError("Titre et date obligatoires.");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (res.ok) {
        setNewEvent({ title: "", date: "", description: "" });
        fetchData();
      } else {
        setError("Erreur lors de la création de l’événement.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur serveur.");
    }
  };

  // Suppression d’un événement
  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Supprimer cet événement ?")) return;

    try {
      const res = await fetch(`${apiUrl}/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("superadmin_token");
    router.push("/login");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-green-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barre supérieure */}
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Panneau SuperAdmin FORDAC
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-green-900 px-3 py-2 rounded hover:bg-green-800 transition"
        >
          <LogOut className="w-4 h-4" /> Déconnexion
        </button>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 p-6 grid md:grid-cols-2 gap-6">
        {/* Section Admins */}
        <section className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-green-700">
            <Users className="w-5 h-5" /> Administrateurs
          </h2>
          {admins.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucun administrateur enregistré.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {admins.map((admin) => (
                <li key={admin.id} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {admin.role}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Section Événements */}
        <section className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-green-700">
            <Calendar className="w-5 h-5" /> Événements
          </h2>

          <form onSubmit={handleCreateEvent} className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="Titre de l’événement"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="border w-full rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="border w-full rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500"
            />
            <textarea
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="border w-full rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
            >
              Ajouter
            </button>
          </form>

          {events.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucun événement enregistré.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {events.map((ev) => (
                <li key={ev.id} className="py-3 flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{ev.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(ev.date).toLocaleDateString()} — {ev.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(ev.id)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {error && (
        <div className="bg-red-100 text-red-700 py-2 text-center text-sm">{error}</div>
      )}

      {/* Pied de page */}
      <footer className="text-center py-3 text-xs text-gray-500">
        © {new Date().getFullYear()} FORDAC Connect — SuperAdmin Dashboard
      </footer>
    </div>
  );
}
