import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

export default function ReservistSupportPage() {
  return (
    <div dir="rtl">
      <Head>
        <title>ליווי מילואימניקים | O.M Real Estate</title>
        <meta
          name="description"
          content="ליווי אישי ומדויק למשרתי מילואים המחפשים פתרון נדל״ני נכון, מותאם ורגיש למציאות החיים בישראל."
        />
      </Head>

      <div className="relative bg-gray-800 h-64 sm:h-72 flex items-center justify-center text-white text-center">
        <Image
          src="/hero-images/hero3.jpg"
          alt="רקע אורבני"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-40"
          priority
        />
        <div className="relative z-10 px-4">
          <h1 className="hero-title">ליווי מילואימניקים</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">
            ליווי אישי ומדויק למשרתי מילואים המחפשים פתרון נדל&quot;ני נכון, מותאם ורגיש למציאות החיים בישראל.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <section className="ui-card bg-white p-8 md:p-10 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-custom-black mb-5">פתרון נדל&quot;ני מותאם למשרתי מילואים</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              אני מציע ליווי אישי למשרתי מילואים ומשפחותיהם, מתוך הבנה למציאות המורכבת, ללחץ, לחוסר הוודאות ולצורך בקבלת
              החלטות נכונות בזמן הנכון.
            </p>
          </section>

          <section className="ui-card bg-white p-8 md:p-10 mb-10">
            <h2 className="ui-h2 text-gray-900">מה כולל הליווי</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pr-6">
              <li>אפיון צרכים ומטרות בצורה מדויקת</li>
              <li>התאמת נכס ואזור מגורים לפי תקציב ואורח חיים</li>
              <li>איתור נכסים רלוונטיים וחיסכון בזמן יקר</li>
              <li>ליווי בתהליך קבלת החלטות ומשא ומתן</li>
              <li>חיבור לאנשי מקצוע משלימים לפי הצורך</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="ui-h2 text-gray-900 text-center">למי זה מתאים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="ui-card bg-white p-6">
                <h3 className="ui-h3 text-gray-900">משרתי מילואים המחפשים דירה לרכישה</h3>
              </div>
              <div className="ui-card bg-white p-6">
                <h3 className="ui-h3 text-gray-900">משפחות שמבקשות יציבות בתקופה מורכבת</h3>
              </div>
              <div className="ui-card bg-white p-6">
                <h3 className="ui-h3 text-gray-900">מי שזקוק לליווי מהיר, ברור ואמין</h3>
              </div>
              <div className="ui-card bg-white p-6">
                <h3 className="ui-h3 text-gray-900">מי שמחפש פתרון נדל&quot;ני בלי לבזבז זמן ואנרגיה מיותרים</h3>
              </div>
            </div>
          </section>

          <section className="ui-card bg-white p-8 md:p-10 mb-10">
            <h2 className="ui-h2 text-gray-900">למה לעבוד איתי</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pr-6">
              <li>הבנה של המציאות האישית והמשפחתית</li>
              <li>תהליך מסודר, ברור ורגיש</li>
              <li>הסתכלות נדל&quot;נית וכלכלית רחבה</li>
              <li>ליווי אישי לאורך כל הדרך</li>
              <li>התאמה אמיתית לצורך ולא רק לנכס</li>
            </ul>
          </section>

          <section className="ui-card bg-custom-black text-white p-8 md:p-10 text-center">
            <h2 className="ui-h2 text-white">לעמוד ההסבר המלא לליווי מילואימניקים</h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              ניתן לעבור לעמוד הייעודי ולקבל מידע נוסף על השירות, תהליך הליווי והאפשרויות המתאימות לכם.
            </p>
            <a
              href="https://ori-shpak.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-btn ui-btn-primary"
            >
              לעמוד ליווי מילואימניקים
            </a>
            <p className="text-sm text-gray-300 mt-4">אפשר גם ליצור קשר ישירות אם תרצו הכוונה ראשונית.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
