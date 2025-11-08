"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Simulation (remplace par ton endpoint si nécessaire)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("📧 Un lien de réinitialisation a été envoyé à votre adresse email.");
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-fordac-gradient text-white px-4 py-8 sm:py-0">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md border border-white/20 transition-all duration-300">
        
        {/* 🟢 LOGO FORDAC */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative mb-3">
            <Image
              src="/logo.png"
              alt="Logo FORDAC"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            Mot de passe oublié
          </h1>
          <p className="text-white/80 text-sm mt-1 text-center max-w-sm">
            Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        {/* 📩 FORMULAIRE */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/70" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresse email"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 sm:py-3 rounded-md bg-white text-green-700 font-semibold hover:bg-green-100 transition-colors duration-200 text-sm sm:text-base"
          >
            {loading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-white/90">{message}</p>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/login")}
            className="text-white/80 text-sm hover:text-white underline transition-colors"
          >
            ← Retour à la connexion
          </button>
        </div>

        <footer className="text-center text-xs text-white/60 mt-6">
          © 2025 FORDAC Connect — Assistance SuperAdmin
        </footer>
      </div>
    </div>
  );
}
