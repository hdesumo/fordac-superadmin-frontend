"use client";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ title }: { title: string }) {
  const superadmin = JSON.parse(
    localStorage.getItem("superadmin") || "{}"
  );

  return (
    <div className="flex items-center justify-between bg-white/10 backdrop-blur-md p-4 rounded-xl mb-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-white/80">{superadmin?.email}</span>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
