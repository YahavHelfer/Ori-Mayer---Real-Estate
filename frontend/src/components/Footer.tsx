// frontend/src/components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // פרטי הקשר (אפשר להעביר לקובץ הגדרות או משתני סביבה)
  const contactInfo = {
    phone: '052-8367466',
    whatsappNumber: '972528367466', // פורמט בינלאומי ל-WhatsApp (ללא + או 00)
    email: 'orimayerealestate@gmail.com',
    facebookUrl: 'https://www.facebook.com/profile.php?id=100068491899602',
    instagramUrl: 'https://www.instagram.com/realestate_tlv_the_mayer_ori/',
    linkedinUrl: 'https://www.linkedin.com/in/ori-mayer-632249b0',
    tiktokUrl: 'https://www.tiktok.com/@ori.mayer',
    address: 'רחוב דיזנגוף 50, תל אביב', // כתובת משרד (אופציונלי)
  };

  // State עבור הטופס הקטן בפוטר
  const [footerName, setFooterName] = useState('');
  const [footerContact, setFooterContact] = useState(''); // יכול להיות טלפון או אימייל
  const [footerStatusMessage, setFooterStatusMessage] = useState('');
  const [isFooterSubmitting, setIsFooterSubmitting] = useState(false);

  const handleFooterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!footerName || !footerContact) {
        setFooterStatusMessage('נא למלא שם וטלפון/אימייל.');
        return;
    }
    setIsFooterSubmitting(true);
    setFooterStatusMessage('שולח פנייה...');

    const formData = {
      name: footerName,
      email: footerContact.includes('@') ? footerContact : `לא_סופק_אימייל_-_טלפון:${footerContact}`,
      phone: footerContact.includes('@') ? 'לא סופק טלפון' : footerContact,
      message: `פנייה מהטופס הקטן בפוטר. פרט יצירת קשר: ${footerContact}`,
      recipientEmail: contactInfo.email,
    };

    try {
      const backendApiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!backendApiUrl) {
        setFooterStatusMessage('שגיאה: כתובת ה-API של השרת אינה מוגדרת.');
        setIsFooterSubmitting(false);
        return;
      }

      const response = await fetch(`${backendApiUrl}/send-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setIsFooterSubmitting(false);

      if (response.ok) {
        const result = await response.json();
        setFooterStatusMessage(result.message || 'פנייתך נשלחה בהצלחה!');
        setFooterName('');
        setFooterContact('');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'שגיאה לא ידועה.' }));
        setFooterStatusMessage(`שגיאה: ${errorData.message || 'נסה שוב.'}`);
      }
    } catch (error) {
      setIsFooterSubmitting(false);
      console.error("Error submitting footer contact form:", error);
      setFooterStatusMessage('שגיאה בשליחת הפנייה. נסה שוב מאוחר יותר.');
    }
  };

  return (
    <footer className="relative bg-gray-900 text-gray-300 py-12 md:py-16" dir="rtl">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/footer-background.jpg" // ודא שהקובץ הזה קיים ב-public
          alt="רקע בניינים"
          layout="fill"
          objectFit="cover"
          quality={50}
        />
        <div className="absolute inset-0 bg-black opacity-75"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
        
        {/* עמודה 1: לוגו וטקסט קצר */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-semibold text-custom-gold mb-4">אורי מאיר נדל"ן</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            מתווך הנדל"ן האישי שלך, מלווה אותך בכל שלב בדרך לנכס החלומות או למכירה מוצלחת.
          </p>
        </div>

        {/* עמודה 2: קישורים מהירים */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">ניווט באתר</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-custom-gold transition-colors">עמוד הבית</Link></li>
            <li><Link href="/sales" className="hover:text-custom-gold transition-colors">נכסים למכירה</Link></li>
            <li><Link href="/rentals" className="hover:text-custom-gold transition-colors">נכסים להשכרה</Link></li>
            <li><Link href="/about" className="hover:text-custom-gold transition-colors">אודות</Link></li>
            <li><Link href="/testimonials" className="hover:text-custom-gold transition-colors">המלצות</Link></li>
            <li><Link href="/contact" className="hover:text-custom-gold transition-colors">צור קשר</Link></li>
          </ul>
        </div>

        {/* עמודה 3: טופס יצירת קשר קטן */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">השאר פרטים ונחזור אליך</h3>
          <form onSubmit={handleFooterSubmit} className="space-y-3">
            <div>
              <label htmlFor="footer-name" className="sr-only">שם</label>
              <input
                type="text"
                id="footer-name"
                name="footer-name"
                placeholder="שם מלא"
                value={footerName}
                onChange={(e) => setFooterName(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 px-3 py-2 rounded-md text-sm focus:ring-custom-gold focus:border-custom-gold focus:outline-none text-right"
              />
            </div>
            <div>
              <label htmlFor="footer-contact" className="sr-only">טלפון או אימייל</label>
              <input
                type="text"
                id="footer-contact"
                name="footer-contact"
                placeholder="טלפון או אימייל"
                value={footerContact}
                onChange={(e) => setFooterContact(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 px-3 py-2 rounded-md text-sm focus:ring-custom-gold focus:border-custom-gold focus:outline-none text-right"
              />
            </div>
            <button
              type="submit"
              disabled={isFooterSubmitting}
              className="w-full bg-custom-gold text-custom-black font-semibold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors text-sm disabled:opacity-50"
            >
              {isFooterSubmitting ? 'שולח...' : 'שלח'}
            </button>
            {footerStatusMessage && (
              <p className={`mt-2 text-xs ${footerStatusMessage.includes('שגיאה') ? 'text-red-400' : 'text-green-400'}`}>
                {footerStatusMessage}
              </p>
            )}
          </form>
        </div>
        
        {/* עמודה 4: פרטי קשר ורשתות חברתיות */}
        <div>
            <h3 className="text-lg font-semibold mb-4 text-white">צור קשר ישיר</h3>
            <div className="space-y-3 text-sm">
                <a href={`tel:${contactInfo.phone}`} className="flex items-center justify-start hover:text-custom-gold transition-colors group">
                    <FaPhoneAlt className="text-custom-gold group-hover:text-custom-gold ml-2" />
                    <span>{contactInfo.phone}</span>
                </a>
                <a 
                    href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent("שלום אורי, הגעתי דרך האתר שלך.")}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-start hover:text-custom-gold transition-colors group"
                >
                    <FaWhatsapp className="text-green-400 group-hover:text-green-300 ml-2" />
                    <span>WhatsApp</span>
                </a>
                <a href={`mailto:${contactInfo.email}`} className="flex items-center justify-start hover:text-custom-gold transition-colors group">
                    <FaEnvelope className="text-custom-gold group-hover:text-custom-gold ml-2" />
                    <span>{contactInfo.email}</span>
                </a>
            </div>
            {/* רשתות חברתיות */}
            <div className="mt-6 flex justify-start space-x-4 rtl:space-x-reverse">
                {contactInfo.facebookUrl && <a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-custom-gold"><FaFacebook size={22} /></a>}
                {contactInfo.instagramUrl && <a href={contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-custom-gold"><FaInstagram size={22} /></a>}
                {contactInfo.linkedinUrl && <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-custom-gold"><FaLinkedinIn size={22} /></a>}
                {contactInfo.tiktokUrl && <a href={contactInfo.tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-custom-gold"><FaTiktok size={22} /></a>}
            </div>
        </div>

      </div>
      <div className="text-center text-gray-500 text-xs mt-10 pt-6 border-t border-gray-700/50 relative z-10">
        <p>&copy; {currentYear} כל הזכויות שמורות לאורי מאיר נדל"ן.</p>
      </div>
    </footer>
  );
};

export default Footer;