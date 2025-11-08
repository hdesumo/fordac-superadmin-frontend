"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronRight,
  Menu,
  LogOut,
  Settings,
  User,
} from "lucide-react";

interface TopHeaderProps {
  adminName?: string;
  onToggleSidebar?: () => void;
  onLogout?: () => void;
  notifications?: number;
}

export default function TopHeader({
  adminName = "SuperAdmin",
  onToggleSidebar,
  onLogout,
  notifications = 0,
}: TopHeaderProps) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🕓 Heure en temps réel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // 📍 Détermination du titre et du fil d’Ariane
  const getPageTitle = () => {
    const page = pathname.split("/").filter(Boolean).pop() || "dashboard";
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.length > 0 ? segments : ["dashboard"];
  };

  // 🔒 Ferme le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-30 border-b border-gray-200">
      {/* ===== SECTION GAUCHE ===== */}
      <div className="flex items-center space-x-3">
        {/* Bouton hamburger pour mobile */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            <Menu size={18} />
          </button>
        )}

        {/* Titre et fil d’Ariane */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {getPageTitle()}
          </h2>
          <div className="flex items-center text-sm text-gray-500">
            {getBreadcrumbs().map((crumb, index) => (
              <span key={index} className="flex items-center">
                {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                {index < getBreadcrumbs().length - 1 && (
                  <ChevronRight size={14} className="mx-1" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SECTION DROITE ===== */}
      <div className="flex items-center space-x-5">
        {/* 🔔 Notifications */}
        <div className="relative cursor-pointer">
          <Bell className="text-gray-600" size={20} />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* 🕓 Heure */}
        <div className="text-gray-600 text-sm hidden sm:block">
          {currentTime}
        </div>

        {/* 👤 Profil utilisateur */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
              {adminName.charAt(0)}
            </div>
            <span className="hidden sm:block text-gray-800 font-medium">
              {adminName}
            </span>
          </button>

          {/* Menu déroulant */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden animate-fade-in z-50">
              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <User size={16} className="mr-2" /> Mon profil
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} className="mr-2" /> Paramètres
              </button>

              {onLogout && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 border-t border-gray-100"
                >
                  <LogOut size={16} className="mr-2" /> Déconnexion
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
