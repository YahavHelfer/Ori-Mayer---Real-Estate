// frontend/src/pages/testimonials.tsx

import Head from 'next/head';
import Image from 'next/image';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import type { Testimonial } from '@/types'; // <--- הוספתי ייבוא מהקובץ המרכזי

// הגדרת טיפוס (Interface) הוסרה מכאן כי היא עברה לקובץ המרכזי

// ההמלצות האמיתיות שלך
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: ' פרידה בר-ראבי',
    role: 'קנתה דירה, תל אביב',
    text: 'איש נעים, אמין ומתווך אמיתי. יודע להביא את שני הצדדים להבנות ולסגירת עסקה בצורה האחראית והיעילה ביותר.',
    date: 'מאי 2025',
    rating: 5,
  },
  {
    id: 2,
    name: 'רועי גלס',
    role: 'מכר דירה, תל אביב',
    text: 'אורי עזר לי במכירת הדירה שלי בתל אביב, הוא ללא ספק המתווך מספר 1 בתחום שיצא לי לעבוד איתו, ובכלל הוא אחד האנשים הכי נעימים שיצא לי להכיר. אני ממליץ עליו מעבר למה שמילים יכולות להסביר.',
    date: 'אפריל 2025',
    rating: 5,
  },
  // ... שאר ההמלצות נשארות כפי שהן
  {
    id: 3,
    name: "ארי מנדלוביץ'",
    role: 'מכר דירה, תל אביב',
    text: 'אורי היקר, תודה לך, על הדרך, על השקיפות, על האמת והערכים. שידעת לנצל את הידע שלך, את האחיזה באיזור, להפעיל עוד מתווכים ומעל הכל לשמור עלינו ועל מחיר הדירה. מרגישים שזכינו בחבר ובאיש נדל"ן, שמעתה והלאה ילווה אותנו בעסקאות הנדל"ן של המשפחה.',
    date: 'מרץ 2025',
    rating: 5,
  },
  {
    id: 4,
    name: "Miriam Green",
    role: 'קנתה דירה, תל אביב',
    text: 'אין על אורי המתווך התותח. הוא בולדוזר של עשייה. מקושר מאוד, קשוב, אכפתי, מקשיב לכל הגחמות במטרה להגשים עד למקסימום. אדם אמין וישר שאפשר לסמוך עליו ואני אומרת כל זאת מתוך נסיון אישי איתו. מומלץ מאוד.',
    date: 'פברואר 2025',
    rating: 5,
  },
  {
    id: 5,
    name: "זאב שיסל",
    role: 'מכר דירה, רמת אביב ג׳',
    text: 'אורי הוא מתווך מזן אחר, בנוסף יש בו אנושיות חמה, הבנה פסיכולוגית רגישה של המעורבים בעסקה. פגשתי את אורי כשניסיתי למכור את דירתי ב-5 חד\' ברא"ג ללא הצלחה, בתקופה קשה (המהפכה המשפטית ומתקפת חמאס). אורי בהתמדה ובנחישותו החליק את המכשולים והביא את עסקת המכירה לסיום מוצלח.',
    date: 'ינואר 2025',
    rating: 5,
  },
  {
    id: 6,
    name: "Rodika Steinbricher",
    role: 'מכרה דירה',
    text: 'בשעה טובה מכרנו דירה בעזרת אורי מאיר, אורי קודם כל "בן אדם", ישר, אמין, מקצועי, ואדיב, תודה רבה.',
    date: 'דצמבר 2024',
    rating: 5,
  },
];

// רכיב עזר קטן להצגת כוכבי דירוג
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < rating ? 'fill-current' : 'text-gray-300'} />
      ))}
    </div>
  );
};

export default function TestimonialsPage() {
  return (
    <div dir="rtl">
      <Head>
        <title>המלצות לקוחות - אורי מאיר נדל"ן</title>
        <meta name="description" content="לקוחות מרוצים מספרים על השירות המקצועי והליווי האישי של אורי מאיר." />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gray-800 h-64 sm:h-72 flex items-center justify-center text-white text-center">
        <Image
          src="/hero-images/hero1.jpg" // <<< החלף בתמונה מתאימה
          alt="רקע של תל אביב"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
          priority
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">מה הלקוחות שלנו אומרים</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">שביעות הרצון שלכם היא ההצלחה שלנו.</p>
        </div>
      </div>

      {/* אזור ההמלצות */}
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          {testimonialsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 md:p-8 flex flex-col text-right">
                  <div className="flex-shrink-0 mb-4">
                    {testimonial.avatarUrl ? (
                      <div className="flex items-center">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ml-4 border-2 border-custom-gold">
                          <Image src={testimonial.avatarUrl} alt={testimonial.name} layout="fill" objectFit="cover" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-custom-black">{testimonial.name}</h3>
                          {testimonial.role && <p className="text-sm text-gray-500">{testimonial.role}</p>}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-custom-black">{testimonial.name}</h3>
                        {testimonial.role && <p className="text-sm text-gray-500">{testimonial.role}</p>}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative flex-grow">
                    <FaQuoteLeft className="absolute top-0 left-0 text-6xl text-custom-gold opacity-10 transform -translate-y-3 translate-x-1" />
                    <p className="text-gray-700 leading-relaxed z-10 relative">
                      {testimonial.text}
                    </p>
                  </div>

                  {(testimonial.date || (testimonial.rating && testimonial.rating > 0)) && (
                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                      {testimonial.date && <p className="text-xs text-gray-400">{testimonial.date}</p>}
                      {testimonial.rating && testimonial.rating > 0 && <StarRating rating={testimonial.rating} />}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-xl py-10">אין כרגע המלצות להצגה. נשמח לקבל את ההמלצה שלך!</p>
          )}
        </div>
      </div>
    </div>
  );
}