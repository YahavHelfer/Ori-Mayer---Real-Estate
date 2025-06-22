// src/pages/sitemap.xml.ts

import { GetServerSideProps } from 'next';

const generateSiteMap = (propertyIds: string[]) => {
  const baseUrl = 'https://www.omrealestate.co.il';
  
  // הוסף כאן את כל העמודים הסטטיים שלך
  const staticPages = [
    '/',
    '/about',
    '/contact',
    '/sales',
    '/rentals',
    '/sold',
    '/testimonials',
    '/media'
  ];

  const staticUrls = staticPages.map(page => `${baseUrl}${page}`);
  
  const propertyUrls = propertyIds.map(id => `${baseUrl}/properties/${id}`);

  const allUrls = [...staticUrls, ...propertyUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${allUrls
       .map((url) => {
         return `
           <url>
               <loc>${url}</loc>
               <lastmod>${new Date().toISOString()}</lastmod>
               <changefreq>daily</changefreq>
               <priority>0.8</priority>
           </url>
         `;
       })
       .join('')}
   </urlset>
 `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let propertyIds: string[] = [];

  try {
    // קריאה ל-backend כדי לקבל את כל מזהי הנכסים
    const request = await fetch(`${apiUrl}/api/properties/all-ids`);
    if (request.ok) {
      const ids = await request.json();
      // ודא שכל ה-ID הם מחרוזות
      propertyIds = ids.map((id: any) => String(id));
    }
  } catch (error) {
    console.error("Sitemap generation failed to fetch property IDs:", error);
  }

  const sitemap = generateSiteMap(propertyIds);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

// Next.js דורש ייצוא ברירת מחדל, גם אם הוא ריק
const Sitemap = () => {};
export default Sitemap;