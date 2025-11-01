"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Redirection si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem("superadmin_token");
    if (token) router.push("/dashboard");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api-superadmin.fordac-connect.org";

      const res = await fetch(`${apiUrl}/api/superadmin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("superadmin_token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.error || "Mot de passe incorrect.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur SuperAdmin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm border border-green-100">
        <div className="flex flex-col items-center mb-6">
          <Lock className="text-green-700 w-10 h-10 mb-3" />
          <h1 className="text-lg font-semibold text-gray-800">
            Espace SuperAdmin FORDAC
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="Mot de passe SuperAdmin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-md font-medium transition disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center mt-4 text-sm">{error}</p>
        )}
      </div>

      <p className="text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} FORDAC Connect — Accès SuperAdmin
      </p>
    </div>
  );
}
