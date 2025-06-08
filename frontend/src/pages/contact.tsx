// frontend/src/pages/contact.tsx
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'; 

// פרטי הקשר שלך
const contactInfo = {
  email: 'orimayerealestate@gmail.com',
  phone: '052-8367466',
  officePhone: '03-7228929', 
  address: 'רחוב דיזנגוף 50, תל אביב',
  whatsappDisplayNumber: '052-8367466' // ✅ ערך אמיתי במקום טיפוס

};

// פונקציית עזר לפורמט מספר טלפון לוואטסאפ
const formatPhoneNumberForWhatsApp = (phone: string | null | undefined): string => {
  const defaultPhone = "972528367466"; // <<< החלף במספר הראשי שלך בפורמט בינלאומי
  if (!phone) return defaultPhone;
  let cleanedPhone = phone.replace(/\D/g, ''); 
  if (cleanedPhone.startsWith("0")) {
    cleanedPhone = "972" + cleanedPhone.substring(1);
  } else if (!cleanedPhone.startsWith("972") && cleanedPhone.length === 9) {
    cleanedPhone = "972" + cleanedPhone;
  }
  return cleanedPhone.startsWith("972") && cleanedPhone.length >= 11 ? cleanedPhone : defaultPhone; 
};


export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !email || !phone || !message) {
        setStatusMessage('אנא מלא את כל שדות החובה.');
        return;
    }
    setIsSubmitting(true);
    setStatusMessage('שולח פנייה, אנא המתן...');

    const formData = {
      name,
      email,
      phone,
      message,
      recipientEmail: contactInfo.email, // הפנייה תישלח לאימייל הראשי של אורי
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
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'שגיאה לא ידועה בתקשורת עם השרת.' }));
        setStatusMessage(`שגיאה בשליחת הפנייה: ${errorData.message || 'אנא נסה שוב מאוחר יותר.'}`);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting general contact form:", error);
      setStatusMessage('שגיאה בשליחת הפנייה. בדוק את חיבור האינטרנט שלך או נסה שוב מאוחר יותר.');
    }
  };

  const whatsappNumberForLink = formatPhoneNumberForWhatsApp(contactInfo.phone);
  const genericWhatsAppMessage = "שלום אורי, יצרתי קשר דרך עמוד 'צור קשר' באתר שלך.";


  return (
    <div dir="rtl">
      <Head>
        <title>צור קשר - אורי מאיר נדל"ן</title>
        <meta name="description" content="פנו אלינו בכל שאלה, בקשה או תיאום פגישה. אורי מאיר נדלן לשירותכם." />
      </Head>

      {/* Hero Section עם תמונת רקע */}
      <div className="relative bg-gray-800 h-64 sm:h-72 flex items-center justify-center text-white text-center">
        <Image
          src="/hero-images/hero3.jpg" // <<< ודא שהתמונה הזו קיימת ב-public/hero-images
          alt="רקע של תל אביב"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
          priority
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">צור קשר</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">נשמח לעמוד לשירותכם בכל שאלה ועניין</p>
        </div>
      </div>

      {/* אזור תוכן */}
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 items-start">
            
            {/* עמודה ימנית (ב-RTL): טופס יצירת קשר */}
            <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-right">השאירו פרטים ונחזור אליכם</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-page-name" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    שם מלא <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="contact-page-name"
                    required
                    className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm text-right"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="contact-page-email" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    אימייל <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="contact-page-email"
                    required
                    className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm text-right"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="contact-page-phone" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    טלפון <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="contact-page-phone"
                    required
                    className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm text-right"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="contact-page-message" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    הודעה <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="contact-page-message"
                    rows={5}
                    required
                    className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm text-right"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-custom-black px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-gold disabled:opacity-60"
                  >
                    {isSubmitting ? 'שולח...' : 'שליחה'}
                  </button>
                </div>
                {statusMessage && (
                  <p className={`mt-4 text-sm text-center ${statusMessage.includes('שגיאה') ? 'text-red-600' : 'text-green-600'}`}>
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>

            {/* עמודה שמאלית (ב-RTL): פרטי יצירת קשר */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-2xl flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-custom-gold p-3 rounded-full flex-shrink-0">
                  <FaPhoneAlt className="text-white" size="1.5em" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 text-right">טלפון</h3>
                  <a href={`tel:${contactInfo.phone}`} className="text-custom-black hover:text-custom-gold transition-colors block break-all text-right">{contactInfo.phone}</a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-2xl flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-custom-gold p-3 rounded-full flex-shrink-0">
                  <FaEnvelope className="text-white" size="1.5em" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 text-right">דוא"ל</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-custom-black hover:text-custom-gold transition-colors block break-all text-right">{contactInfo.email}</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-2xl flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-green-500 p-3 rounded-full flex-shrink-0">
                  <FaWhatsapp className="text-white" size="1.5em" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 text-right">WhatsApp</h3>
                  <a 
                      href={`https://wa.me/${whatsappNumberForLink}?text=${encodeURIComponent(genericWhatsAppMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-custom-black hover:text-custom-gold transition-colors block break-all text-right"
                  >
                      {contactInfo.whatsappDisplayNumber || contactInfo.phone}
                  </a>
                </div>
              </div>

              {contactInfo.address && (
                <div className="bg-white p-6 rounded-xl shadow-2xl flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-custom-gold p-3 rounded-full flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="text-white" size="1.5em" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 text-right">כתובת המשרד</h3>
                    <p className="text-custom-black text-right">{contactInfo.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}