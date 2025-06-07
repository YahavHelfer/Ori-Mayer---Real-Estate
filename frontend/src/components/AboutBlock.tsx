// frontend/src/components/AboutBlock.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function AboutBlock() {
  return (
    <section className="bg-white py-16 md:py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* עמודת התמונה */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/OriMayer.jpg" // <<< ודא שהתמונה קיימת ב-public/images
                alt="אורי מאיר - מומחה לנדלן בתל אביב"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          {/* עמודת הטקסט */}
          <div className="text-center md:text-right">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              המומחה האישי שלך לנדל"ן בתל אביב
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              נעים מאוד, שמי אורי מאיר. עם ניסיון עשיר, היכרות מעמיקה עם השוק התל אביבי, ומחויבות אישית להצלחה שלכם, אני כאן כדי להפוך את עסקת הנדל"ן הבאה שלכם לחוויה הטובה ביותר. אני מאמין בשקיפות, מקצועיות ושירותיות ללא פשרות.
            </p>
            <Link href="/about" className="inline-block bg-custom-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors text-base">
                הסיפור המלא שלי
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}