// frontend/src/components/FeaturedTestimonials.tsx
import Link from 'next/link';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import type { Testimonial } from '../pages/testimonials'; // נניח שהגדרת את הטיפוס שם

// העתק את הנתונים מעמוד ההמלצות או ייבא אותם
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "זאב שיסל",
    role: 'מכר דירה, רמת אביב ג׳',
    text: 'אורי הוא מתווך מזן אחר, בנוסף יש בו אנושיות חמה, הבנה פסיכולוגית רגישה של המעורבים בעסקה. פגשתי את אורי כשניסיתי למכור את דירתי ב-5 חד\' ברא"ג ללא הצלחה, בתקופה קשה (המהפכה המשפטית ומתקפת חמאס). אורי בהתמדה ובנחישותו החליק את המכשולים והביא את עסקת המכירה לסיום מוצלח.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Miriam Green',
    role: 'קנתה דירה, תל אביב',
    text: 'אין על אורי המתווך התותח. הוא בולדוזר של עשייה. מקושר מאוד, קשוב, אכפתי, מקשיב לכל הגחמות במטרה להגשים עד למקסימום. אדם אמין וישר שאפשר לסמוך עליו ואני אומרת כל זאת מתוך נסיון אישי איתו. מומלץ מאוד.',
    rating: 5,
  },
  {
    id: 3,
    name: "ארי מנדלוביץ'",
    role: 'מכר דירה, תל אביב',
    text: 'אורי היקר, תודה לך, על הדרך, על השקיפות, על האמת והערכים. שידעת לנצל את הידע שלך ואת האחיזה באיזור.',
    rating: 5,
  },
];

// רכיב עזר לכוכבים
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < rating ? 'fill-current' : 'text-gray-300'} />
      ))}
    </div>
  );
};

export default function FeaturedTestimonials() {
  // ניקח רק את 3 ההמלצות הראשונות להצגה בעמוד הבית
  const featured = testimonialsData.slice(0, 3);

  return (
    <section className="bg-white py-16 md:py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">לקוחות ממליצים</h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              {testimonial.rating && <StarRating rating={testimonial.rating} />}
              <p className="text-gray-700 my-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-custom-black">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
  <Link href="/testimonials" className="text-lg text-custom-gold font-semibold hover:underline">
    קרא את כל ההמלצות &rarr;
  </Link>
</div>
      </div>
    </section>
  );
}