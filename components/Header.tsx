"use client";

import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";

interface HeaderProps {
  title: string;
  onToggleSidebar?: () => void;
}

export default function Header({ title, onToggleSidebar }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="flex items-center justify-between bg-green-700 text-white px-6 py-3 shadow">
      {/* Bouton menu mobile */}
      <button
        onClick={() => {
          setMenuOpen(!menuOpen);
          if (onToggleSidebar) onToggleSidebar();
        }}
        className="lg:hidden"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Titre */}
      <h1 className="text-lg font-semibold tracking-wide">{title}</h1>

      {/* Profil / Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-white text-green-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-50 transition"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </header>
  );
}
