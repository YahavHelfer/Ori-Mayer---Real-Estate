import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const recipientEmail = 'orimayerealestate@gmail.com';
const contactPhone = '052-8367466';

const formatPhoneNumberForWhatsApp = (phone: string | null | undefined): string => {
  const defaultPhone = '972528367466';
  if (!phone) return defaultPhone;
  let cleanedPhone = phone.replace(/\D/g, '');
  if (cleanedPhone.startsWith('0')) {
    cleanedPhone = '972' + cleanedPhone.substring(1);
  } else if (!cleanedPhone.startsWith('972') && cleanedPhone.length === 9) {
    cleanedPhone = '972' + cleanedPhone;
  }
  return cleanedPhone.startsWith('972') && cleanedPhone.length >= 11 ? cleanedPhone : defaultPhone;
};

export default function CommunitySupportPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const whatsappNumberForLink = formatPhoneNumberForWhatsApp(contactPhone);
  const whatsappMessage = 'שלום אורי, אשמח לשיחה ראשונית בנושא ליווי קהילות בתהליך העלייה לישראל.';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('שולח פנייה, אנא המתן...');

    const formData = {
      name,
      email,
      phone,
      message,
      propertyId: 'community-support',
      propertyAddress: 'ליווי קהילות',
      recipientEmail,
    };

    try {
      const backendApiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!backendApiUrl) {
        setStatusMessage('שגיאה: כתובת ה-API של השרת אינה מוגדרת.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${backendApiUrl}/api/send-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setIsSubmitting(false);

      if (response.ok) {
        const result = await response.json();
        setStatusMessage(result.message || 'הפנייה נשלחה בהצלחה! ניצור איתך קשר בהקדם.');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: 'שגיאה לא ידועה בתקשורת עם השרת.' }));
        setStatusMessage(`שגיאה בשליחת הפנייה: ${errorData.message || 'אנא נסה שוב מאוחר יותר.'}`);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error submitting community support form:', error);
      setStatusMessage('שגיאה בשליחת הפנייה. בדוק את חיבור האינטרנט שלך או נסה שוב מאוחר יותר.');
    }
  };

  return (
    <div dir="rtl">
      <Head>
        <title>ליווי קהילות יהודיות בעלייה לישראל | O.M Real Estate</title>
        <meta
          name="description"
          content='ליווי קהילות יהודיות בתהליך העלייה לישראל עם פתרון נדל"ני מלא – התאמת אזור מגורים, איתור נכסים, משא ומתן וליווי מקצועי מלא.'
        />
      </Head>

      <div className="relative bg-gray-800 h-64 sm:h-72 flex items-center justify-center text-white text-center">
        <Image
          src="/hero-images/hero3.jpg"
          alt="רקע של תל אביב"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-40"
          priority
        />
        <div className="relative z-10 px-4">
          <h1 className="hero-title">ליווי קהילות</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">
            ליווי ליהודים מכל רחבי העולם בתהליך העלייה וההתבססות בישראל, עם מעטפת נדל&quot;נית מלאה, אישית ומדויקת.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <section className="ui-card bg-white p-8 md:p-10 mb-10">
            <div className="mb-5 text-left" dir="ltr">
              <Link href="/community-support-en" className="text-custom-gold hover:underline">
                English version
              </Link>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-custom-black mb-5">
              ליווי קהילות יהודיות בתהליך העלייה לישראל
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              אני מלווה יהודים מכל רחבי העולם בתהליך העלייה ומספק פתרון נדל&quot;ני מלא – משלב האפיון הראשוני
              ועד קבלת המפתח לבית החדש בישראל.
            </p>
          </section>

          <section className="ui-card bg-white p-8 md:p-10 mb-10">
            <h2 className="ui-h2 text-gray-900">מה כולל התהליך</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pr-6">
              <li>מיפוי מדויק של צרכים, מטרות ותקציב</li>
              <li>התאמת אזור מגורים בהתאם לאופי המשפחה, קהילה, מוסדות חינוך וסגנון חיים</li>
              <li>איתור וסינון נכסים באופן ממוקד וחכם</li>
              <li>ניהול משא ומתן מקצועי</li>
              <li>
                חיבור לצוות מומחים אמין: עורכי דין, יועצי משכנתאות, מומחי מיסוי, שמאים ובעלי מקצוע נוספים לפי
                הצורך
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="ui-h2 text-gray-900 text-center">למי זה מתאים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="ui-card bg-white p-6">
                <h3 className="ui-h3 text-gray-900">משפחות בתהליך עלייה</h3>
                <p className="text-gray-700 leading-relaxed">ליווי מקיף לקבלת החלטות נכונות ובטוחות כבר מהשלב הראשון.</p>
              </div>
              <div className="ui-card bg-white p-6">
                <h3 className="ui-h3 text-gray-900">קהילות מאורגנות המעוניינות בליווי מרוכז</h3>
                <p className="text-gray-700 leading-relaxed">פתרון מקצועי אחד שמרכז תהליך יעיל לקבוצה כולה.</p>
              </div>
              <div className="ui-card bg-white p-6">
                <h3 className="ui-h3 text-gray-900">רוכשים מחו&quot;ל שמחפשים מעטפת מלאה בישראל</h3>
                <p className="text-gray-700 leading-relaxed">איתור נכסים, ניהול תהליך וחיבור לאנשי מקצוע אמינים.</p>
              </div>
              <div className="ui-card bg-white p-6">
                <h3 className="ui-h3 text-gray-900">משפחות שמחפשות ודאות וחיסכון בטעויות יקרות</h3>
                <p className="text-gray-700 leading-relaxed">תהליך ברור עם נקודות החלטה מדויקות לאורך כל הדרך.</p>
              </div>
            </div>
          </section>

          <section className="ui-card bg-white p-8 md:p-10 mb-10">
            <h2 className="ui-h2 text-gray-900">למה לעבוד איתי</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pr-6">
              <li>ליווי אישי ומדויק</li>
              <li>הבנה של צרכי משפחות וקהילות</li>
              <li>חיבור לאנשי מקצוע רלוונטיים</li>
              <li>הסתכלות נדל&quot;נית וכלכלית רחבה</li>
              <li>ליווי מקצה לקצה</li>
            </ul>
          </section>

          <section className="ui-card bg-custom-black text-white p-8 md:p-10 mb-10">
            <p className="text-lg leading-relaxed mb-6 text-gray-100">
              המטרה שלי איננה רק למצוא דירה – אלא לבנות לכל משפחה בסיס יציב, בטוח ונכון כלכלית לפרק החדש שלה
              בישראל.
            </p>
            <p className="text-lg leading-relaxed text-gray-100">
              אני מאמין שלקהילות יהודיות ברחבי העולם מגיע גורם מקצועי אחד שמרכז עבורן את כל המעטפת, מייצר ודאות
              בתהליך ומונע טעויות יקרות.
            </p>
          </section>

          <section className="ui-card bg-white p-8 md:p-10 mb-10 text-center">
            <h2 className="ui-h2 text-gray-900">אפשר גם לפנות אליי ישירות בוואטסאפ</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              לשיחה ראשונית מהירה וממוקדת לגבי תהליך העלייה וההתבססות בישראל.
            </p>
            <a
              href={`https://wa.me/${whatsappNumberForLink}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors text-lg shadow-md"
            >
              <FaWhatsapp className="ml-2" />
              לשיחה ראשונית בוואטסאפ
            </a>
          </section>

          <section className="ui-card bg-white p-8 md:p-10">
            <h2 className="ui-h2 text-gray-900">השאירו פרטים ונחזור אליכם</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              אשמח לשוחח ולהציג כיצד ניתן לסייע לחברי הקהילה בתהליך העלייה וההתבססות בישראל.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="community-support-name" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  שם
                </label>
                <input
                  id="community-support-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-right focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="community-support-phone" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  טלפון
                </label>
                <input
                  id="community-support-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-right focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="community-support-email" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  אימייל
                </label>
                <input
                  id="community-support-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-right focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="community-support-message"
                  className="block text-sm font-medium text-gray-700 mb-1 text-right"
                >
                  הודעה
                </label>
                <textarea
                  id="community-support-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-right focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-custom-black px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-gold disabled:opacity-60"
              >
                {isSubmitting ? 'שולח...' : 'שליחה'}
              </button>

              {statusMessage && (
                <p className={`mt-4 text-sm text-center ${statusMessage.includes('שגיאה') ? 'text-red-600' : 'text-green-600'}`}>
                  {statusMessage}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
