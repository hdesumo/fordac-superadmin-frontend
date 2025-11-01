"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://api-superadmin.fordac-connect.org/api/superadmin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur de connexion.");

      // ✅ Si succès, stocke le token et redirige vers le dashboard
      localStorage.setItem("superadmin_token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-800 via-green-600 to-green-400 text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-white/20">
        <h1 className="text-3xl font-bold mb-2 text-white">
          FORDAC SuperAdmin
        </h1>
        <p className="text-white/80 mb-6">Accès sécurisé au panneau de contrôle</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-3 rounded-lg text-gray-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-200 text-sm font-medium bg-red-700/30 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 transition-colors duration-300 py-3 rounded-lg text-lg font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>

      <footer className="absolute bottom-4 text-white/70 text-sm">
        © 2025 FORDAC Connect — Panneau SuperAdmin
      </footer>
    </main>
  );
}
