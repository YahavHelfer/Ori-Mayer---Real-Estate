// frontend/src/components/TopBanner.tsx
import Link from 'next/link';
import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
  { href: "https://www.facebook.com/profile.php?id=100068491899602", icon: <FaFacebookF />, label: "Facebook" },
  { href: "https://www.instagram.com/realestate_tlv_the_mayer_ori/", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://www.linkedin.com/in/ori-mayer-632249b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: <FaLinkedinIn />, label: "LinkedIn" },
  { href: "https://www.tiktok.com/@ori.mayer?_t=8rr3SML9fyW&_r=1", icon: <FaTiktok />, label: "TikTok" },
  { href: "https://youtube.com/@ori-mayer", icon: <FaYoutube />, label: "YouTube" },
];

const contactDetails = {
  phone: "052-8367466",
  email: "orimayerealestate@gmail.com",
};

export default function TopBanner() {
  return (
    <div className="bg-custom-gold text-custom-black py-2 px-4 text-sm border-b border-black/20">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center" dir="rtl"> {/* הוספתי dir="rtl" כאן כדי לוודא כיווניות */}
        {/* צד ימין (ב-RTL) - פרטי יצירת קשר */}
        {/* מגדילים את ה-space-x כאן כדי לרווח יותר בין מקבץ הטלפון למקבץ האימייל */}
        <div className="flex items-center space-x-6 rtl:space-x-reverse mb-2 sm:mb-0">
          <a href={`tel:${contactDetails.phone}`} className="flex items-center hover:text-black transition-colors">
            <FaPhoneAlt className="ml-2" /> {/* ב-RTL, זה יהיה רווח מימין לטקסט. אם האתר כולו RTL, אפשר גם להשתמש ב-mr-2 */}
            <span>{contactDetails.phone}</span>
          </a>
          <a href={`mailto:${contactDetails.email}`} className="flex items-center hover:text-black transition-colors">
            <FaEnvelope className="ml-2" /> {/* ב-RTL, זה יהיה רווח מימין לטקסט. אם האתר כולו RTL, אפשר גם להשתמש ב-mr-2 */}
            <span>{contactDetails.email}</span>
          </a>
        </div>

        {/* צד שמאל (ב-RTL) - רשתות חברתיות */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {socialLinks.map((social) => (
            <Link
              href={social.href}
              key={social.label}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-custom-black hover:text-black/70 transition-colors text-lg"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}