// frontend/src/components/CallToActionBlock.tsx
import Link from 'next/link';

export default function CallToActionBlock() {
  return (
    <section className="bg-custom-gold" dir="rtl">
      <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
        <h2 className="ui-h2 text-custom-black">
          מוכנים לעשות את הצעד הבא?
        </h2>
        <p className="ui-copy-gap text-lg text-gray-800 mb-8">
          בין אם אתם חושבים למכור, לקנות או סתם רוצים להתייעץ על מצב השוק, אני כאן בשבילכם.
        </p>
        <Link href="/contact" className="ui-btn ui-btn-primary text-lg px-8 py-3">
            בואו נדבר
        </Link>
      </div>
    </section>
  );
}
