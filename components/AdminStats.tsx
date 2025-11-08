"use client";

import React from "react";
import { Users, Building2, UserMinus } from "lucide-react";

type Props = {
  totalAdmins: number;
  activeCount: number;
  inactiveCount: number;
  totalDepartments: number;
};

export default function AdminStats({
  totalAdmins,
  activeCount,
  inactiveCount,
  totalDepartments,
}: Props) {
  const stats = [
    {
      title: "Total Admins",
      value: totalAdmins,
      icon: <Users className="text-green-600 w-6 h-6" />,
      color: "bg-green-50",
    },
    {
      title: "Actifs",
      value: activeCount,
      icon: <Users className="text-emerald-600 w-6 h-6" />,
      color: "bg-emerald-50",
    },
    {
      title: "Inactifs",
      value: inactiveCount,
      icon: <UserMinus className="text-gray-500 w-6 h-6" />,
      color: "bg-gray-50",
    },
    {
      title: "Départements",
      value: totalDepartments,
      icon: <Building2 className="text-green-700 w-6 h-6" />,
      color: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s) => (
        <div
          key={s.title}
          className={`flex items-center justify-between p-4 rounded-xl shadow-sm ${s.color}`}
        >
          <div>
            <p className="text-sm text-gray-600">{s.title}</p>
            <h3 className="text-xl font-semibold text-gray-800">
              {s.value ?? 0}
            </h3>
          </div>
          {s.icon}
        </div>
      ))}
    </div>
  );
}
