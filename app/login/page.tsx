"use client";

import { useState } from "react";
import Image from "next/image";
import { loginSuperAdmin } from "@/utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginSuperAdmin(email, password);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        window.location.href = "/dashboard";
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } catch (err) {
      setError("Erreur de connexion. Réessayez.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#C1121F] to-[#E63946] text-white">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo-fordac.png"
            alt=""
            width={70}
            height={70}
            priority
            className="mb-3 rounded-xl"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Connexion SuperAdmin
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-[#C1121F] text-white py-3 rounded-lg hover:bg-[#a10f1a] transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
