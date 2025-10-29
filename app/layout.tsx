import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORDAC SuperAdmin",
  description:
    "Panneau de contrôle du Super Administrateur - Forces Démocratiques pour l’Action et le Changement (FORDAC)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-100 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
