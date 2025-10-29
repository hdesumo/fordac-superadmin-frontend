"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  CalendarDays,
  Settings,
  Shield,
  FileText,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { href: "/dashboard", label: "Tableau de bord", icon: Home },
    { href: "/admins", label: "Administrateurs", icon: Shield },
    { href: "/events", label: "Événements", icon: CalendarDays },
    { href: "/members", label: "Adhésions", icon: Users },
    { href: "/news", label: "Actualités", icon: FileText },
    { href: "/settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-white border-r border-gray-200 h-screen fixed lg:static top-0 left-0 flex flex-col transition-all duration-200`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2
          className={`text-green-700 font-semibold text-lg ${
            collapsed ? "hidden" : "block"
          }`}
        >
          FORDAC
        </h2>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-green-700"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Liens */}
      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                active
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <Icon size={18} />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* Pied de menu */}
      <div className="p-3 border-t text-xs text-gray-500">
        {!collapsed && (
          <>
            <p>FORDAC SuperAdmin</p>
            <p className="text-gray-400">v1.0.0</p>
          </>
        )}
      </div>
    </aside>
  );
}
