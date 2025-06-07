// frontend/src/components/ServicesBlock.tsx
import { FaSearchDollar, FaKey, FaHandshake, FaBullhorn, FaUserFriends, FaClipboardList } from 'react-icons/fa';

// הגדרת השירותים עם אייקונים מיובאים
const services = [
  {
    icon: <FaSearchDollar />,
    title: 'ייעוץ ראשוני',
    description: 'ייעוץ ראשוני וליווי מלא בכל שלבי המכירה או רכישה של דירה.',
  },
  {
    icon: <FaKey />,
    title: 'סיוע בתמחור נדל"ן',
    description: 'סיוע בתמחור מדויק של הדירה, ביחס למחירי השוק ובהתאם למצב הנכס.',
  },
  {
    icon: <FaBullhorn />,
    title: 'פרסום ושיווק',
    description: 'פרסום ושיווק הנכס בכל הפלטפורמות המתאימות והשקעות זמן הדרוש למכירה.',
  },
  {
    icon: <FaHandshake />,
    title: 'מכירת נכסים',
    description: 'איתור קונים וניהול משא ומתן עד לחתימה על עסקה מוצלחת.',
  },
  {
    icon: <FaClipboardList />,
    title: 'קניית נכסים',
    description: 'שירות קניית נכס החל משלב החיפוש ועד למציאת הנכס המתאים לצרכי הלקוח.',
  },
  {
    icon: <FaUserFriends />,
    title: 'אנשי מקצוע',
    description: 'קישור לאנשי מקצוע מהשורה הראשונה (עורכי דין, שמאים, קבלני שיפוצים ועוד).',
  },
];

export default function ServicesBlock() {
  return (
    <section className="bg-gray-50 py-16 md:py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">השירותים שלנו</h2>
          <p className="mt-4 text-lg text-gray-600">ליווי מלא מ-א' ועד ת' להצלחה שלך</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex justify-center items-center mx-auto mb-4 w-20 h-20 bg-custom-gold/10 rounded-full">
                {/* הצגת האייקון מ-react-icons */}
                <div className="text-custom-gold text-4xl">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-custom-black mb-2">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}