"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });

  const API_URL = "https://api-superadmin.fordac-connect.org/api/superadmin/events";

  useEffect(() => {
    const token = localStorage.getItem("superadmin_token");
    if (!token) {
      router.push("/");
      return;
    }
    fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setEvents);
  }, [router]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("superadmin_token");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(newEvent),
    });
    const data = await res.json();
    setEvents([...events, data]);
    setNewEvent({ title: "", date: "", description: "" });
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("superadmin_token");
    if (!confirm("Supprimer cet événement ?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setEvents(events.filter((ev) => ev.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Gestion des Événements</h1>

      <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Titre"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button className="mt-4 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg">
          Ajouter
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-green-800">{ev.title}</h3>
            <p className="text-gray-600">{ev.date}</p>
            <p className="text-gray-700 mb-4">{ev.description}</p>
            <button
              onClick={() => handleDelete(ev.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
