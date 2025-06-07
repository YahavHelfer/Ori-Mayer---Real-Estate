// frontend/src/components/ContactPropertyModal.tsx
"use client"; // רכיבים עם אינטראקטיביות צריכים להיות Client Components
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';
import type { Property } from '../types'; // ודא שהנתיב לטיפוס Property נכון

interface ContactPropertyModalProps {
  isOpen: boolean;
  closeModal: () => void;
  property: Property | null;
  realtorEmail: string; // האימייל של המתווך לקבלת הפנייה
}

export default function ContactPropertyModal({ isOpen, closeModal, property, realtorEmail }: ContactPropertyModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // איפוס הטופס והודעת הסטטוס כשהמודל נסגר או הנכס משתנה
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setStatusMessage(''); // איפוס הודעת סטטוס
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('שולח פנייה, אנא המתן...');

    const formData = {
      name,
      email,
      phone,
      message,
      propertyId: property?.id,
      propertyAddress: property?.fullAddress || `${property?.street || ''}, ${property?.city || ''}`.replace(/^,|,$/g, '').trim(),
      recipientEmail: realtorEmail,
    };

    console.log("Form data to be sent:", formData);

    try {
      const backendApiUrl = process.env.NEXT_PUBLIC_API_URL; // קבלת ה-URL של ה-API מה-Backend
      if (!backendApiUrl) {
        setStatusMessage('שגיאה: כתובת ה-API של השרת אינה מוגדרת.');
        setIsSubmitting(false);
        return;
      }

      // שימוש ב-backendApiUrl המלא
      const response = await fetch(`${backendApiUrl}/send-inquiry`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setIsSubmitting(false);

      if (response.ok) {
        const result = await response.json(); // קריאת התשובה מהשרת
        setStatusMessage(result.message || 'הפנייה נשלחה בהצלחה! ניצור איתך קשר בהקדם.');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setTimeout(() => {
          closeModal();
          // setStatusMessage(''); // אפשר לאפס את ההודעה גם כאן אם רוצים
        } , 3000); // סגור את המודל אחרי 3 שניות
      } else {
        const errorData = await response.json().catch(() => ({ message: 'שגיאה לא ידועה בתקשורת עם השרת.' }));
        setStatusMessage(`שגיאה בשליחת הפנייה: ${errorData.message || 'אנא נסה שוב מאוחר יותר.'}`);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting form:", error);
      setStatusMessage('שגיאה בשליחת הפנייה. בדוק את חיבור האינטרנט שלך או נסה שוב מאוחר יותר.');
    }
  };

  if (!property) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={isSubmitting ? () => {} : closeModal} dir="rtl">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 md:p-8 text-right align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl lg:text-2xl font-semibold leading-tight text-gray-900 mb-1"
                >
                  יצירת קשר בנוגע לנכס:
                </Dialog.Title>
                <p className="text-sm text-gray-600 mb-6 border-b pb-3">
                  {property.fullAddress || `${property.street}, ${property.city}`}
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="modal-contact-name" className="block text-sm font-medium text-gray-700 mb-1">שם מלא <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="name"
                        id="modal-contact-name" // שינוי ID למניעת כפילות אם הטופס מופיע במספר מקומות
                        required
                        className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-contact-email" className="block text-sm font-medium text-gray-700 mb-1">כתובת אימייל <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        id="modal-contact-email"
                        required
                        className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-contact-phone" className="block text-sm font-medium text-gray-700 mb-1">טלפון <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        id="modal-contact-phone"
                        required
                        className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-contact-message" className="block text-sm font-medium text-gray-700 mb-1">הודעה <span className="text-red-500">*</span></label>
                      <textarea
                        name="message"
                        id="modal-contact-message"
                        rows={4}
                        required
                        className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-gold focus:border-custom-gold sm:text-sm"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-start gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center rounded-md border border-transparent bg-custom-gold px-6 py-2.5 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'שולח...' : 'שלח פנייה'}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                      disabled={isSubmitting}
                    >
                      ביטול
                    </button>
                  </div>
                  {statusMessage && <p className={`mt-4 text-sm ${statusMessage.includes('שגיאה') ? 'text-red-600' : 'text-green-600'}`}>{statusMessage}</p>}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}