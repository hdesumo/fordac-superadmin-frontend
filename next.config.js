/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Désactivation de turbo expérimental (cause d’avertissements)
  experimental: {
    turbo: false
  },

  // ✅ Domains autorisés pour les assets externes si besoin
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fordac-connect.org",
      },
    ],
  },

  // ✅ Variables publiques accessibles dans tout le frontend
  env: {
    NEXT_PUBLIC_API_URL: "https://api-superadmin.fordac-connect.org",
  },

  // ✅ Support des headers HTTP sécurisés
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
