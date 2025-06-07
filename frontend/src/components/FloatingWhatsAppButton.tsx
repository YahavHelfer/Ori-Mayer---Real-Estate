// frontend/src/components/FloatingWhatsAppButton.tsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

// פונקציית עזר לפורמט מספר טלפון.
// אם כבר הוצאת אותה לקובץ utils מרכזי, ייבא אותה משם.
// אם לא, אפשר להגדיר אותה כאן.
const formatPhoneNumberForWhatsApp = (phone: string | null | undefined): string => {
  const defaultPhone = "972528367466"; // <<< ודא שזו ברירת המחדל הנכונה
  if (!phone) return defaultPhone;
  
  let cleanedPhone = phone.replace(/\D/g, ''); // הסרת כל מה שאינו ספרה
  
  if (cleanedPhone.startsWith("0")) {
    cleanedPhone = "972" + cleanedPhone.substring(1); // החלפת 0 ב-972
  } else if (!cleanedPhone.startsWith("972") && cleanedPhone.length === 9 && cleanedPhone.startsWith("5")) {
    // למקרה של מספר קצר (למשל, 528367466)
    cleanedPhone = "972" + cleanedPhone;
  }
  
  // ודא שהתוצאה תקינה, אחרת החזר ברירת מחדל
  return cleanedPhone.startsWith("972") && cleanedPhone.length >= 11 ? cleanedPhone : defaultPhone; 
};


const FloatingWhatsAppButton = () => {
  const phoneNumber = "052-8367466"; // <<< המספר המקורי יכול להיות כאן
  
  // שימוש בפונקציה כדי לקבל את המספר המפורמט
  const whatsAppNumberForLink = formatPhoneNumberForWhatsApp(phoneNumber);

  const prefilledMessage = "שלום אורי, הגעתי דרך האתר שלך ואשמח לעזרה.";

  return (
    <a
      href={`https://wa.me/${whatsAppNumberForLink}?text=${encodeURIComponent(prefilledMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="צור קשר ב-WhatsApp"
      className="fixed bottom-5 right-5 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform hover:scale-110"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default FloatingWhatsAppButton;