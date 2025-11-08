import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "FORDAC SuperAdmin",
  description: "Panneau de contrôle du SuperAdmin FORDAC Connect"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-fordac.png"
              alt=""
              width={40}
              height={40}
              priority
              className="rounded-lg"
            />
            <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
              FORDAC SuperAdmin
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Tableau de bord
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Déconnexion
            </Link>
          </nav>
        </header>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
