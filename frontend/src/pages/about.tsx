// frontend/src/pages/about.tsx
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrophy, FaHandshake, FaLightbulb } from 'react-icons/fa'; // אייקונים ליתרונות

export default function AboutPage() {
  return (
    <div dir="rtl">
      <Head>
        <title>אודות אורי מאיר - מתווך נדל"ן</title>
        <meta name="description" content="הכירו את אורי מאיר, הניסיון, החזון והערכים שמובילים אותי להצלחה בעסקאות הנדלן שלכם." />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gray-800 h-64 sm:h-72 flex items-center justify-center text-white">
        <Image
          src="/hero-images/hero2.jpg" // החלף בתמונה מתאימה (יכולה להיות אותה תמונה מהסליידר, או תמונת נוף אורבני אחרת)
          alt="רקע של תל אביב"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">הסיפור מאחורי ההצלחה שלך</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">הדרך שלי לליווי עסקאות נדל"ן מנצחות</p>
        </div>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          {/* אזור התוכן המרכזי */}
          <section className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center mb-16 md:mb-24">
            <div className="md:col-span-2">
              <div className="relative w-full max-w-[350px] mx-auto h-96 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/OriMayer.jpg" // <<< החלף בתמונת פרופיל מקצועית שלך (שים ב-public/images)
                  alt="אורי מאיר - מתווך נדלן"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="md:col-span-3 text-gray-700 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">מי אני?</h2>
              <p className="mb-4">
                נעים מאוד, שמי אורי מאיר, ואני חי ונושם את עולם הנדל"ן בשנים האחרונות. עם ניסיון עשיר במכירה, קנייה והשכרת נכסים במגוון רחב של אזורים וסוגי נכסים, אני כאן כדי ללוות אתכם יד ביד בכל שלבי העסקה.
              </p>
              <p className="mb-4">
                המומחיות שלי היא להבין את הצרכים והרצונות הייחודיים של כל לקוח, ולמצוא עבורו את הנכס המושלם או את הקונה/שוכר האידיאלי. אני מאמין בשקיפות מלאה, מקצועיות ללא פשרות, ושירות אישי בגובה העיניים.
              </p>
              <p>
                התהליך של קנייה או מכירת נכס יכול להיות מורכב ומלחיץ. המטרה שלי היא להפוך אותו לחוויה חיובית, יעילה ומוצלחת עבורכם, תוך דאגה לכל הפרטים הקטנים והגדולים.
              </p>
            </div>
          </section>

          {/* אזור "הערכים שלי" / "למה אני?" */}
          <section className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">החזון המקצועי שלי</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">שלושה עקרונות שמנחים אותי בכל עסקה ועסקה.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <FaHandshake className="text-custom-gold text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">אמינות ושותפות</h3>
                <p className="text-gray-600">האינטרס שלכם הוא האינטרס שלי. אני מאמין בשקיפות מלאה ובבניית מערכת יחסים של אמון כבסיס להצלחה משותפת.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <FaTrophy className="text-custom-gold text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">מקצועיות ומצוינות</h3>
                <p className="text-gray-600">ידע מעמיק בשוק, ניתוח נתונים מדויק וניהול משא ומתן ללא פשרות כדי להשיג עבורכם את התוצאה הטובה ביותר.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <FaLightbulb className="text-custom-gold text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">יצירתיות ושירותיות</h3>
                <p className="text-gray-600">כל עסקה היא ייחודית. אני מביא פתרונות יצירתיים, זמינות גבוהה וליווי אישי וסבלני לכל אורך הדרך.</p>
              </div>
            </div>
          </section>

          {/* אזור קריאה לפעולה */}
          <section className="text-center bg-custom-black text-white p-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">מוכנים להתחיל את המסע?</h2>
            <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
              בין אם אתם קונים, מוכרים או שוכרים, אני כאן כדי לעזור לכם לעשות את הצעד הנכון. בואו נדבר.
            </p>
            <Link href="/contact" className="hover:text-custom-gold transition-colors">
  צור קשר
</Link>
          </section>
        </div>
      </div>
    </div>
  );
}