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
  
  // 👇 התוספת נמצאת כאן
  eslint: {
    // אזהרה: זה מאפשר לבנייה להצליח גם אם יש שגיאות ESLint בפרויקט
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;