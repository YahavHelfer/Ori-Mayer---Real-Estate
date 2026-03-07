import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope, FaPhoneAlt, FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok, FaMapMarkerAlt } from 'react-icons/fa';

const footerLinks = [
  { href: '/', label: 'בית' },
  { href: '/sales', label: 'נכסים למכירה' },
  { href: '/rentals', label: 'נכסים להשכרה' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' },
];

const contactInfo = {
  phone: '052-8367466',
  email: 'orimayerealestate@gmail.com',
  address: 'רחוב דיזנגוף 50, תל אביב',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100068491899602',
  instagramUrl: 'https://www.instagram.com/realestate_tlv_the_mayer_ori/',
  linkedinUrl: 'https://www.linkedin.com/in/ori-mayer-632249b0',
  tiktokUrl: 'https://www.tiktok.com/@ori.mayer',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-custom-black text-gray-300 border-t border-white/10" dir="rtl">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <div className="mb-4">
              <Image
                src="/images/Logo.png"
                alt='אורי מאיר נדל"ן'
                width={120}
                height={48}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              ליווי אישי, מקצועי ומדויק בעולם הנדל״ן בתל אביב.
            </p>
          </div>

          <div>
            <h3 className="text-custom-gold text-base font-semibold mb-4">ניווט מהיר</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-custom-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-custom-gold text-base font-semibold mb-4">פרטי קשר</h3>
            <div className="space-y-3 text-sm">
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-gray-300 hover:text-custom-gold transition-colors">
                <FaPhoneAlt className="text-custom-gold" aria-hidden="true" />
                <span>{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-gray-300 hover:text-custom-gold transition-colors">
                <FaEnvelope className="text-custom-gold" aria-hidden="true" />
                <span className="break-all">{contactInfo.email}</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <FaMapMarkerAlt className="text-custom-gold mt-0.5" aria-hidden="true" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-custom-gold text-base font-semibold mb-4">חיבורים נוספים</h3>
            <p className="text-sm text-gray-400 mb-4">זמינים עבורכם גם ברשתות החברתיות.</p>
            <div className="flex items-center gap-3">
              {contactInfo.facebookUrl && (
                <a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-custom-gold transition-colors">
                  <FaFacebook size={20} />
                </a>
              )}
              {contactInfo.instagramUrl && (
                <a href={contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-custom-gold transition-colors">
                  <FaInstagram size={20} />
                </a>
              )}
              {contactInfo.linkedinUrl && (
                <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-custom-gold transition-colors">
                  <FaLinkedinIn size={20} />
                </a>
              )}
              {contactInfo.tiktokUrl && (
                <a href={contactInfo.tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-custom-gold transition-colors">
                  <FaTiktok size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-gray-500">
          <p>© {currentYear} אורי מאיר נדל״ן. כל הזכויות שמורות.</p>
          <div className="mt-2">
            <Link href="/privacy-policy" className="text-gray-300 hover:text-custom-gold transition-colors">
              מדיניות פרטיות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
