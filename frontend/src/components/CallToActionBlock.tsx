// frontend/src/components/CallToActionBlock.tsx
import Link from 'next/link';

export default function CallToActionBlock() {
  return (
    <section className="bg-custom-gold" dir="rtl">
      <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-custom-black mb-3">
          מוכנים לעשות את הצעד הבא?
        </h2>
        <p className="text-lg text-gray-800 mb-8">
          בין אם אתם חושבים למכור, לקנות או סתם רוצים להתייעץ על מצב השוק, אני כאן בשבילכם.
        </p>
        <Link href="/contact" className="bg-custom-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition-transform hover:scale-105 text-lg inline-block">
            בואו נדבר
        </Link>
      </div>
    </section>
  );
}