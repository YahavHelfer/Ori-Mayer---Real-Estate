// frontend/src/pages/media.tsx
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';

// הגדרת טיפוס (Interface) לכתבה בודדת
interface MediaArticle {
  id: number;
  title: string;
  source: string;
  date: string;
  link: string;
  imageUrl?: string;
  excerpt: string;
}

// הנתונים שלך, עם תיקון ל-id הייחודי
const articlesData: MediaArticle[] = [
  {
    id: 1,
    title: '"חלון ההזדמנויות ייסגר בקרוב": האם כדאי לקנות היום דירה בישראל?',
    source: 'מעריב',
    date: '01.09.2023',
    link: 'https://www.maariv.co.il/economy/israel/article-1034755',
    imageUrl: '/media-images/article1.png',
    excerpt: 'אורי מאיר מ"אבסולוט נכסים", מתווך נדל"ן מזה עשור, טוען כי "מי שקונה עכשיו דירה, בחלון הזמנים שנפתח עכשיו, ירוויח פעמיים"',
  },
  {
    id: 2,
    title: "500 ימים למלחמת חרבות ברזל: אורי מאיר, קצין וג'נטלמן, קיבל את הפקודה ויצא מיד למלחמה",
    source: 'Israel News',
    date: '17.02.2025',
    link: 'https://israel-news.co.il/archives/41560',
    imageUrl: '/media-images/article2.jpg',
    excerpt: 'במהלך מלחמת חרבות ברזל גויסו רבים לשירות מילואים... בתוך כל אלו שמוסרים נפשם למדינה, ישנו קצין מילואים שגויס למלחמה מהיום הראשון שלה.',
  },
  {
    id: 3,
    title: 'השקעות נדל"ן חכמות: איפה כדאי לקנות היום?',
    source:'TheMarker',
    date: '15.06.2023',
    link: 'https://www.themarker.com/realestate/2023-06-15/ty-article-magazine/.highlight/00000188-bdb9-d8c4-a3e9-fdbbebbb0000',
    imageUrl: '/media-images/article3.png',
    excerpt: 'אורי מאיר, מתווך נדל"ן בצפון תל אביב, חושב שבקרוב תהיה עבודה רק לחצי מהמתווכים... "נגמרה התקופה שבעלי נכסים קובעים את המחיר. היום הקונים מכתיבים את הקצב".',
  },
  {
    id: 4, // <<< תיקנתי את ה-id לערך ייחודי
    title: 'דילמת 90/10 — האם שוק הנדל"ן לקראת עליית מחירים?',
    source: 'TheMarker',
    date: '10.03.2025',
    link: 'https://www.themarker.com/realestate/2024-03-10/ty-article/.highlight/0000018e-282e-d2ed-a9cf-3cbe769b0000', // <<< תיקנתי את הקישור לדוגמה, החלף בקישור הנכון
    imageUrl: '/media-images/article4.jpg',
    excerpt: 'המתווך אורי מאיר סבור שיש כאן הזדמנות, בעיקר בדירות חדשות, שכן "יזמים וקבלנים יוצאים מגדרם כדי למכור, אין להם סבלנות לחכות שתהיה עליית מחירים".',
  },
  {
    id: 5, // <<< תיקנתי את ה-id לערך ייחודי
    title: 'ראיון ברדיו כל רגע בשבע כלכלי',
    source: 'שבע כלכלי - רדיו כל רגע',
    date: '19.03.2024',
    link: 'https://96fm.co.il/broadcast/19-03-2024-%D7%A9%D7%91%D7%A2-%D7%9B%D7%9C%D7%9B%D7%9C%D7%99/',
    imageUrl: '/media-images/article5.png',
    excerpt: 'תוך כדי המילואים, קיבלתי שיחת טלפון. העלו אותי לשידור ל"שבע כלכלי " עם מהרן פרוזנפר. הפתעה גמורה.',
  },
];

export default function MediaPage() {
  return (
    <div dir="rtl">
      <Head>
        <title>אורי מאיר בתקשורת</title>
        <meta name="description" content="כתבות, ראיונות ופרסומים של אורי מאיר בכלי התקשורת המובילים בישראל." />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gray-800 h-64 sm:h-72 flex items-center justify-center text-white text-center">
        <Image
          src="/hero-images/hero4.jpg" // <<< החלף בתמונה מתאימה
          alt="רקע של עיתונים או מדיה"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
          priority
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">אורי מאיר בתקשורת</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">כתבות, ראיונות וניתוחי שוק</p>
        </div>
      </div>
      
      {/* אזור הכתבות */}
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          {articlesData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articlesData.map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group">
                  {article.imageUrl && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image 
                        src={article.imageUrl} 
                        alt={article.title}
                        layout="fill" 
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow text-right">
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-custom-gold mb-1">{article.source}</p>
                      <h2 className="text-xl font-bold text-gray-800 mb-2 min-h-[3.5rem]">{article.title}</h2>
                      <p className="text-xs text-gray-500 mb-4">{article.date}</p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        "{article.excerpt}"
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <a 
                        href={article.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        קרא את הכתבה המלאה
                        <FaLink className="mr-2" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-xl py-10">אין כרגע כתבות להצגה.</p>
          )}
        </div>
      </div>
    </div>
  );
}