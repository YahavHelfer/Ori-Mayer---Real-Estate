// frontend/src/components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'; // הוספנו useState
import { FaBars, FaTimes } from 'react-icons/fa'; // אייקונים להמבורגר

export default function Navbar() {
  const router = useRouter();
  const isActive = (pathname: string) => router.pathname === pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State לתפריט מובייל

  // סדר הקישורים כפי שהם צריכים להופיע ויזואלית מימין לשמאל ב-RTL
  const navLinksInOrder = [
    { href: "/media", label: "בתקשורת" },
    { href: "/about", label: "אודות" },
    { href: "/testimonials", label: "המלצות" },
    { href: "/contact", label: "צור קשר" },
    { href: "/sold", label: "נכסים שנמכרו" },
    { href: "/rentals", label: "להשכרה" },
    { href: "/sales", label: "למכירה" },
    { href: "/", label: "בית" },

  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    // אם ה-dir="rtl" מוגדר גלובלית (ב-_document.tsx), אין צורך בו כאן
    <nav className="bg-custom-black text-gold-text px-4 py-2 shadow-lg sticky top-0 z-40"> {/* שינוי py-0 ל-py-2 */}
      <div className="container mx-auto flex justify-between items-center">
        
        {/* לוגו - יהיה בצד שמאל (כי הוא ראשון ב-flex והדף LTR או שאנחנו "כופים" LTR על ה-Navbar) */}
        {/* אם האתר כולו RTL, וה-flex container הזה הוא בן ישיר, הלוגו יהיה מימין. */}
        {/* כדי לוודא לוגו שמאל וקישורים ימין, גם ב-RTL גלובלי, נשים את הלוגו ראשון והקישורים שני */}
        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <Image 
              src="/images/Logo.png" // ודא שהנתיב נכון
              alt="אורי מאיר נדלן - לוגו" 
              width={140} // התאם לגודל הרצוי
              height={32} // התאם לגודל הרצוי (py-2 נותן 16px, אז גובה ה-nav יהיה בערך 32px + גובה הפונט)
              priority 
              className="object-contain"
            />
          </Link>
        </div>

        {/* קישורי ניווט למסך רחב - יהיו בצד ימין */}
        <ul className="hidden md:flex items-center space-x-3 md:space-x-4 lg:space-x-5 rtl:space-x-reverse">
          {navLinksInOrder.map((link) => ( //  משתמשים במערך המסודר נכון ל-RTL
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`hover:text-custom-gold transition-colors px-1 sm:px-2 py-1 rounded-md text-xs sm:text-sm md:text-base 
                            ${isActive(link.href) 
                              ? 'text-custom-gold font-semibold border-b-2 border-custom-gold' 
                              : 'text-gold-text'
                            }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* כפתור המבורגר למסך קטן */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="פתח תפריט"
            className="text-gold-text hover:text-custom-gold focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* תפריט מובייל נפתח */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-custom-black absolute left-0 right-0 shadow-lg z-40 py-2" dir="rtl">
          <ul className="flex flex-col items-stretch">
            {/* בתפריט הנייד, הסדר הוא ויזואלי מלמעלה למטה, אז נשתמש בסדר המקורי של navLinksInOrder */}
            {navLinksInOrder.map((link) => (
              <li key={link.href} className="w-full">
                <Link 
                  href={link.href} 
                  className={`block w-full py-3 px-4 text-right hover:bg-gray-700 hover:text-custom-gold transition-colors
                              ${isActive(link.href) 
                                ? 'text-custom-gold font-semibold' 
                                : 'text-gold-text'
                              }`}
                  onClick={() => setIsMobileMenuOpen(false)} // סגור תפריט בלחיצה
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}