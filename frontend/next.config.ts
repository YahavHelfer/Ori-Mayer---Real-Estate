import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 👇 --- זו ההגדרה שנוספה כדי למנוע קריסות --- 👇
    unoptimized: true,

    // הגדרת ה-remotePatterns נשארת כפי שהיא
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
  
  eslint: {
    // אזהרה: זה מאפשר לבנייה להצליח גם אם יש שגיאות ESLint בפרויקט
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;