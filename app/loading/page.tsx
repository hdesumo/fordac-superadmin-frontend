"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // 🔁 Simulation de la progression
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push("/dashboard"), 600); // redirection automatique
          return 100;
        }
        return prev + 3;
      });
    }, 80); // vitesse de progression
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-fordac-gradient text-white text-center px-4">
      {/* 🌿 Logo FORDAC animé */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-20 h-20 sm:w-28 sm:h-28 relative mb-6"
      >
        <Image
          src="/logo.png"
          alt="Logo FORDAC"
          fill
          className="object-contain rounded-full drop-shadow-lg"
          priority
        />
      </motion.div>

      {/* 🔄 Texte principal */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl sm:text-2xl font-semibold mb-2"
      >
        Connexion en cours...
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-white/80 text-sm sm:text-base mb-8"
      >
        Merci de patienter, votre espace SuperAdmin se charge.
      </motion.p>

      {/* 📊 Barre de progression */}
      <div className="w-64 sm:w-80 bg-white/20 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className="h-3 bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
        />
      </div>

      <p className="mt-3 text-sm text-white/80 font-medium">
        {progress < 100 ? `${progress}%` : "Chargement terminé ✅"}
      </p>

      {/* ⚪ Spinner doux */}
      {progress < 100 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            delay: 0.6,
            duration: 1.2,
            ease: "linear",
            repeat: Infinity,
          }}
          className="mt-6 w-8 h-8 border-4 border-white/40 border-t-white rounded-full"
        ></motion.div>
      )}

      {/* 📅 Footer */}
      <footer className="absolute bottom-6 text-xs text-white/50">
        © 2025 FORDAC Connect — Chargement sécurisé
      </footer>
    </div>
  );
}
