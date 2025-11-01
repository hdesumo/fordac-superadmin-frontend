"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, LogOut, LayoutDashboard, Users, Settings } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("superadmin_token");
    window.location.href = "/login";
  };

  return (
    <html lang="fr">
      <body className="flex min-h-screen bg-neutral text-dark dark:bg-neutral-dark dark:text-light">
        {/* Sidebar */}
        <aside
          className={`${
            menuOpen ? "w-56" : "w-20"
          } bg-primary text-light flex flex-col items-center py-6 transition-all duration-300`}
        >
          <div
            className="flex items-center justify-center w-full mb-8 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-2xl font-bold tracking-tight">
              {menuOpen ? "FORDAC" : "F"}
            </span>
          </div>

          <nav className="flex flex-col space-y-6 w-full px-4">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-primary-light transition"
            >
              <LayoutDashboard size={20} />
              {menuOpen && <span>Tableau de bord</span>}
            </Link>

            <Link
              href="/admins"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-primary-light transition"
            >
              <Users size={20} />
              {menuOpen && <span>Administrateurs</span>}
            </Link>

            <Link
              href="/settings"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-primary-light transition"
            >
              <Settings size={20} />
              {menuOpen && <span>Paramètres</span>}
            </Link>
          </nav>

          <div className="mt-auto mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-sm hover:text-secondary transition"
            >
              <LogOut size={18} />
              {menuOpen && <span>Déconnexion</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen bg-neutral-light dark:bg-dark transition">
          {/* Header */}
          <header className="flex justify-between items-center px-6 py-4 border-b border-neutral-dark dark:border-neutral">
            <h1 className="text-lg font-semibold text-primary dark:text-secondary">
              Panneau SuperAdmin FORDAC
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-neutral transition"
              title="Changer de thème"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </header>

          {/* Content */}
          <div className="flex-1 p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
