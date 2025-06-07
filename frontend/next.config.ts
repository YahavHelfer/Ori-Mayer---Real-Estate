// frontend/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // או כל הגדרה אחרת שכבר קיימת
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webtiv.co.il',
        port: '',
        pathname: '/getPic.aspx/**',
      },
      // אם יש לך עוד hostnames שאתה רוצה לאשר, הוסף אותם כאן
    ],
  },
  // אם יש לך עוד הגדרות Next.js, הוסף אותן כאן
};

export default nextConfig;