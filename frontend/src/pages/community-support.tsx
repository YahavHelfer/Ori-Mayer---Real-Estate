import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

const recipientEmail = 'orimayerealestate@gmail.com';

export default function CommunitySupportPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <div dir="rtl" className="bg-gray-50">
      <Head>
        <title>ליווי קהילות יהודיות בעלייה לישראל | O.M Real Estate</title>
        <meta
          name="description"
          content='ליווי קהילות יהודיות בתהליך העלייה לישראל עם פתרון נדל"ני מלא – התאמת אזור מגורים, איתור נכסים, משא ומתן וליווי מקצועי מלא.'
        />
      </Head>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="ui-card bg-white p-8 md:p-10">
            <div className="mb-4">
              <Link href="/community-support-en" className="text-custom-gold hover:underline">
                English version
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-custom-black mb-5">
              ליווי קהילות יהודיות בתהליך העלייה לישראל
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              אני מלווה יהודים מכל רחבי העולם בתהליך העלייה ומספק פתרון נדל"ני מלא – משלב האפיון
              הראשוני ועד קבלת המפתח לבית החדש בישראל.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="ui-card bg-white p-8 md:p-10">
            <h2 className="ui-h2 text-gray-900">מה כולל התהליך</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pr-6">
              <li>מיפוי מדויק של צרכים, מטרות ותקציב</li>
              <li>התאמת אזור מגורים בהתאם לאופי המשפחה, קהילה, מוסדות חינוך וסגנון חיים</li>
              <li>איתור וסינון נכסים באופן ממוקד וחכם</li>
              <li>ניהול משא ומתן מקצועי</li>
              <li>
                חיבור לצוות מומחים אמין: עורכי דין, יועצי משכנתאות, מומחי מיסוי, שמאים ובעלי מקצוע
                נוספים לפי הצורך
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="ui-card bg-white p-8 md:p-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              המטרה שלי איננה רק למצוא דירה – אלא לבנות לכל משפחה בסיס יציב, בטוח ונכון כלכלית לפרק
              החדש שלה בישראל.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              אני מאמין שלקהילות יהודיות ברחבי העולם מגיע גורם מקצועי אחד שמרכז עבורן את כל המעטפת,
              מייצר ודאות בתהליך ומונע טעויות יקרות.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="ui-card bg-white p-8 md:p-10">
            <h2 className="ui-h2 text-gray-900">השאירו פרטים ונחזור אליכם</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              אשמח לשוחח ולהציג כיצד ניתן לסייע לחברי הקהילה בתהליך העלייה וההתבססות בישראל.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="community-support-name" className="block text-sm font-medium text-gray-700 mb-1">
                  שם
                </label>
                <input
                  id="community-support-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="block w-full rounded-md border border-gray-300 px-4 py-2.5 text-right focus:outline-none focus:ring-custom-gold focus:border-custom-gold"
                />
              </div>

              <div>
                <label htmlFor="community-support-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  טלפון
                </label>
                <input
                  id="community-support-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="block w-full rounded-md border border-gray-300 px-4 py-2.5 text-right focus:outline-none focus:ring-custom-gold focus:border-custom-gold"
                />
              </div>

              <div>
                <label htmlFor="community-support-email" className="block text-sm font-medium text-gray-700 mb-1">
                  אימייל
                </label>
                <input
                  id="community-support-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="block w-full rounded-md border border-gray-300 px-4 py-2.5 text-right focus:outline-none focus:ring-custom-gold focus:border-custom-gold"
                />
              </div>

              <div>
                <label htmlFor="community-support-message" className="block text-sm font-medium text-gray-700 mb-1">
                  הודעה
                </label>
                <textarea
                  id="community-support-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="block w-full rounded-md border border-gray-300 px-4 py-2.5 text-right focus:outline-none focus:ring-custom-gold focus:border-custom-gold"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="ui-btn ui-btn-primary w-full">
                {isSubmitting ? 'שולח...' : 'שליחה'}
              </button>

              {statusMessage && (
                <p
                  className={`text-sm text-center ${
                    statusMessage.includes('שגיאה') ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
