"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Activity,
  Calendar,
  Settings,
  LogOut,
  Building,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Admins", path: "/admins", icon: Users },
  { name: "Activités", path: "/activity", icon: Activity },
  { name: "Départements", path: "/departments", icon: Building },
  { name: "Événements", path: "/events", icon: Calendar },
  { name: "Paramètres", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <>
      {/* ✅ Bouton mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md"
      >
        ☰
      </button>

      {/* ✅ Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-700">
              FORDAC <span className="text-gray-700">Admin</span>
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map(({ name, path, icon: Icon }) => (
              <button
                key={path}
                onClick={() => {
                  router.push(path);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === path
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} className="mr-3" />
                {name}
              </button>
            ))}
          </nav>

          {/* Déconnexion */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={18} className="mr-3" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
