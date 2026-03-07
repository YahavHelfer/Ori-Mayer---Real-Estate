// frontend/src/pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import { FaCity, FaHome, FaGem, FaSearch, FaClipboardList, FaHandshake, FaCheckCircle } from 'react-icons/fa';
import PropertyCard from '../components/PropertyCard';
import HeroSlider, { FilterValues } from '../components/HeroSlider';
import AboutBlock from '../components/AboutBlock';
import ServicesBlock from '../components/ServicesBlock';
import FeaturedTestimonials from '../components/FeaturedTestimonials';
import CallToActionBlock from '../components/CallToActionBlock';
import { GetStaticProps } from 'next'; // <<< שינוי כאן
import type { Property } from '../types';
import React, { useState, useEffect, useRef, useMemo } from 'react';

interface HomePageProps {
  initialProperties: Property[];
}

function SectionDivider({ withAccent = false }: { withAccent?: boolean }) {
  return (
    <div className="container mx-auto px-4 py-4 md:py-6" aria-hidden="true">
      <div className="relative">
        <div className="h-px bg-gradient-to-l from-transparent via-black/10 to-transparent" />
        {withAccent && (
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-custom-gold/60" />
        )}
      </div>
    </div>
  );
}

// vvv שינוי שם הפונקציה ל-getStaticProps והוספת revalidate vvv
export const getStaticProps: GetStaticProps<HomePageProps> = async (context) => {
  let initialProperties: Property[] = [];
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      'https://ori-mayer-real-estate.onrender.com';
    const res = await fetch(`${apiUrl}/api/properties`);

    if (res.ok) {
      initialProperties = await res.json();
    } else {
      console.error("Failed to fetch properties for static generation:", res.status);
    }
  } catch (error) {
    console.error("Error fetching properties in getStaticProps:", error);
  }

  return {
    props: {
      initialProperties,
    },
    //  <<< הוספה חשובה: רענן את הנתונים כל שעה (3600 שניות)
    //  אם ה-XML שלך מתעדכן בתדירות גבוהה יותר, תוכל להקטין את הערך הזה.
    //  למשל, 600 ל-10 דקות.
    revalidate: 3600, 
  };
};

export default function HomePage({ initialProperties }: HomePageProps) {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialProperties);
  const featuredProperties = initialProperties.slice(0, 4);
  const [showStickySearch, setShowStickySearch] = useState(false);
  const [stickyLocation, setStickyLocation] = useState('');
  const [stickyPropertyType, setStickyPropertyType] = useState('');
  const [stickyRooms, setStickyRooms] = useState('');
  const [stickyMinPrice, setStickyMinPrice] = useState('');
  const [stickyMaxPrice, setStickyMaxPrice] = useState('');
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const quickDiscoveryCards = [
    {
      title: 'דירות בתל אביב',
      description: 'לצפייה בדירות באחד האזורים המבוקשים בארץ',
      href: '/sales',
      icon: FaCity,
      image: '/quick-discovery/tel-aviv.png',
    },
    {
      title: 'בתים פרטיים',
      description: 'בתים עם מרחב, פרטיות ואופי',
      href: '/sales',
      icon: FaHome,
      image: '/quick-discovery/private-home.png',
    },
    {
      title: 'דירות יוקרה',
      description: 'נכסים נבחרים בסטנדרט גבוה',
      href: '/sales',
      icon: FaGem,
      image: '/quick-discovery/luxury-apartment.png',
    },
  ];
  const processSteps = [
    {
      title: 'מאפיינים את הצורך',
      description: 'מתחילים בהבנת הצרכים, התקציב והאזור המתאים ביותר עבורכם.',
      icon: FaSearch,
    },
    {
      title: 'בוחרים נכסים מתאימים',
      description: 'מציגים אפשרויות רלוונטיות ומדויקות בהתאם למה שחשוב לכם באמת.',
      icon: FaClipboardList,
    },
    {
      title: 'מלווים לאורך התהליך',
      description: 'זמינות, שקיפות וליווי אישי בכל שלב – משיחת ההיכרות ועד ההחלטה.',
      icon: FaHandshake,
    },
    {
      title: 'סוגרים בביטחון',
      description: 'מנהלים את התהליך במקצועיות כדי שתוכלו להתקדם בראש שקט ובביטחון.',
      icon: FaCheckCircle,
    },
  ];

  const getPropertyTimestamp = (property: Property): number | null => {
    type PropertyDateFields = {
      createdAt?: string | number;
      publishedAt?: string | number;
      dateAdded?: string | number;
      created_at?: string | number;
      published_at?: string | number;
      date_added?: string | number;
    };
    const rawProperty = property as unknown as PropertyDateFields;
    const dateCandidates = [
      rawProperty.createdAt,
      rawProperty.publishedAt,
      rawProperty.dateAdded,
      rawProperty.created_at,
      rawProperty.published_at,
      rawProperty.date_added,
    ];

    for (const candidate of dateCandidates) {
      if (typeof candidate === 'string' || typeof candidate === 'number') {
        const timestamp = new Date(candidate).getTime();
        if (!Number.isNaN(timestamp)) {
          return timestamp;
        }
      }
    }

    return null;
  };

  const latestData = useMemo(() => {
    const withDates = initialProperties
      .map((property) => ({ property, timestamp: getPropertyTimestamp(property) }))
      .filter((item): item is { property: Property; timestamp: number } => item.timestamp !== null)
      .sort((a, b) => b.timestamp - a.timestamp);

    if (withDates.length > 0) {
      return {
        hasRealDates: true,
        items: withDates.slice(0, 4).map((item) => item.property),
      };
    }

    return {
      hasRealDates: false,
      items: initialProperties.slice(0, 3),
    };
  }, [initialProperties]);

  const isNewProperty = (property: Property, index: number) => {
    if (latestData.hasRealDates) {
      const timestamp = getPropertyTimestamp(property);
      if (timestamp === null) return false;
      const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;
      return Date.now() - timestamp <= fourteenDaysMs;
    }

    return index < 2;
  };

  useEffect(() => {
    setFilteredProperties(initialProperties);
  }, [initialProperties]);

  useEffect(() => {
    const heroElement = heroSectionRef.current;
    if (!heroElement) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickySearch(!entry.isIntersecting),
      { threshold: 0.12 }
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);

  const handlePropertySearch = (filters: FilterValues) => {
    // ... לוגיקת הסינון נשארת זהה ...
    let tempProperties = [...initialProperties]; 
    if (filters.location && filters.location.trim() !== '') {
      const searchTerm = filters.location.toLowerCase().trim();
      tempProperties = tempProperties.filter(property =>
        (property.fullAddress && property.fullAddress.toLowerCase().includes(searchTerm)) ||
        (property.city && property.city.toLowerCase().includes(searchTerm)) ||
        (property.street && property.street.toLowerCase().includes(searchTerm)) ||
        (property.neighborhood && property.neighborhood.toLowerCase().includes(searchTerm))
      );
    }
    if (filters.propertyType && filters.propertyType !== '') {
      tempProperties = tempProperties.filter(property =>
        property.propertyType && property.propertyType === filters.propertyType
      );
    }
    if (filters.rooms && filters.rooms !== '') {
      if (filters.rooms === '5+') {
        tempProperties = tempProperties.filter(property => 
          property.rooms !== null && property.rooms !== undefined && property.rooms >= 5
        );
      } else {
        const numRooms = parseFloat(filters.rooms);
        if (!isNaN(numRooms)) {
          tempProperties = tempProperties.filter(property =>
            property.rooms !== null && property.rooms !== undefined && property.rooms === numRooms
          );
        }
      }
    }
    if (filters.minPrice && !isNaN(parseFloat(filters.minPrice))) {
      const min = parseFloat(filters.minPrice);
      tempProperties = tempProperties.filter(property =>
        property.price !== null && property.price !== undefined && property.price >= min
      );
    }
    if (filters.maxPrice && !isNaN(parseFloat(filters.maxPrice))) {
      const max = parseFloat(filters.maxPrice);
      tempProperties = tempProperties.filter(property =>
        property.price !== null && property.price !== undefined && property.price <= max
      );
    }
    setFilteredProperties(tempProperties);
  };

  const handleStickySearch = (event: React.FormEvent) => {
    event.preventDefault();
    handlePropertySearch({
      location: stickyLocation,
      propertyType: stickyPropertyType,
      rooms: stickyRooms,
      minPrice: stickyMinPrice,
      maxPrice: stickyMaxPrice,
    });
  };

  return (
    <div>
      <Head>
        <title>אורי מאיר נדל"ן - מתווך הבית שלך בתל אביב</title>
        <meta name="description" content="רשימת נכסים עדכנית למכירה ולהשכרה בתל אביב והסביבה. אורי מאיר - המומחה שלך לנדלן." />
        <meta property="og:title" content='אורי מאיר נדל"ן - מתווך הבית שלך'  />
        <meta property="og:description" content="רשימת נכסים עדכנית למכירה ולהשכרה בתל אביב והסביבה." />
        <meta property="og:image" content="https://www.omrealestate.co.il/share-image.jpg" />
        <meta property="og:url" content="https://www.omrealestate.co.il/" />
        <meta property="og:type" content="website" />
      
      </Head>

      <section ref={heroSectionRef} className="relative w-full h-[600px]">
        <HeroSlider onSearch={handlePropertySearch} heightClass="h-full" /> 
      </section>

      <div
        className={`fixed left-0 right-0 z-30 px-3 sm:px-4 transition-all duration-300 ${
          showStickySearch
            ? 'top-14 sm:top-16 opacity-100 translate-y-0 pointer-events-auto'
            : 'top-12 sm:top-14 opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-7xl rounded-xl border border-black/10 bg-white/90 backdrop-blur-md shadow-lg">
          <form
            onSubmit={handleStickySearch}
            className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3 items-end p-2 sm:p-3"
            dir="rtl"
          >
            <div className="col-span-2 md:col-span-2">
              <label htmlFor="sticky-location" className="block text-xs font-medium mb-1 text-gray-700 text-right">
                חיפוש
              </label>
              <input
                id="sticky-location"
                type="text"
                placeholder="עיר, רחוב, שכונה"
                className="w-full p-2 rounded-md border border-gray-300 text-gray-800 text-sm focus:ring-blue-500 focus:border-blue-500 text-right"
                value={stickyLocation}
                onChange={(e) => setStickyLocation(e.target.value)}
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="sticky-property-type" className="block text-xs font-medium mb-1 text-gray-700 text-right">
                סוג נכס
              </label>
              <select
                id="sticky-property-type"
                className="w-full p-2 rounded-md border border-gray-300 text-gray-800 text-sm focus:ring-blue-500 focus:border-blue-500 text-right"
                value={stickyPropertyType}
                onChange={(e) => setStickyPropertyType(e.target.value)}
              >
                <option value="">הכל</option>
                <option value="דירה">דירה</option>
                <option value="בית פרטי">בית פרטי</option>
                <option value="פנטהאוז">פנטהאוז</option>
                <option value="דופלקס">דופלקס</option>
                <option value="דירת גן">דירת גן</option>
              </select>
            </div>

            <div className="col-span-1">
              <label htmlFor="sticky-rooms" className="block text-xs font-medium mb-1 text-gray-700 text-right">
                חדרים
              </label>
              <select
                id="sticky-rooms"
                className="w-full p-2 rounded-md border border-gray-300 text-gray-800 text-sm focus:ring-blue-500 focus:border-blue-500 text-right"
                value={stickyRooms}
                onChange={(e) => setStickyRooms(e.target.value)}
              >
                <option value="">הכל</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="5+">5+</option>
              </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-medium mb-1 text-gray-700 text-right">מחיר</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="מ-"
                  className="w-full p-2 rounded-md border border-gray-300 text-gray-800 text-sm focus:ring-blue-500 focus:border-blue-500 text-right"
                  value={stickyMinPrice}
                  onChange={(e) => setStickyMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="עד-"
                  className="w-full p-2 rounded-md border border-gray-300 text-gray-800 text-sm focus:ring-blue-500 focus:border-blue-500 text-right"
                  value={stickyMaxPrice}
                  onChange={(e) => setStickyMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="col-span-2 md:col-span-1 w-full rounded-md bg-custom-gold px-4 py-2.5 text-sm font-semibold text-custom-black transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-custom-gold/60"
            >
              חיפוש
            </button>
          </form>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4" dir="rtl">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">אולי יעניין אתכם</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              בחרו אזור או סוג נכס והתחילו לחפש בצורה נוחה ומהירה
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {quickDiscoveryCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative overflow-hidden rounded-2xl border border-black/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-custom-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-gold/50"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="relative z-10 p-6 text-white h-full flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="text-custom-gold text-2xl mb-3">
                        <Icon />
                      </div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                        <span className="text-custom-gold text-lg transition-transform duration-300 group-hover:-translate-x-0.5">
                          ←
                        </span>
                      </div>
                    </div>
                    <p className="text-white/85 leading-relaxed">{card.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider withAccent />

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4" dir="rtl">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">נכסים נבחרים</h2>
            <p className="text-gray-600">הנכסים הבולטים של אורי מאיר נדל״ן</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={`${property.id}-${index}`} property={property} />
            ))}
          </div>

          <div className="mt-8 md:mt-10 text-center">
            <Link
              href="/sales"
              className="inline-flex items-center justify-center rounded-lg bg-custom-gold px-7 py-3 font-semibold text-custom-black transition-colors hover:bg-opacity-90"
            >
              לכל הנכסים
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4" dir="rtl">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">הנכסים האחרונים שנוספו</h2>
            <p className="text-gray-600">נכסים חדשים שעלו לאחרונה לאתר</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestData.items.map((property, index) => (
              <div key={`${property.id}-${index}-latest`} className="relative">
                {isNewProperty(property, index) && (
                  <div className="absolute top-3 right-3 z-10 rounded-full bg-custom-gold px-3 py-1 text-xs font-semibold text-custom-black shadow">
                    חדש
                  </div>
                )}
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 text-center">
            <Link
              href="/sales"
              className="inline-flex items-center justify-center rounded-lg bg-custom-gold px-7 py-3 font-semibold text-custom-black transition-colors hover:bg-opacity-90"
            >
              לכל הנכסים
            </Link>
          </div>
        </div>
      </section>

      <AboutBlock />
      <ServicesBlock />

      <SectionDivider />

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4" dir="rtl">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">איך התהליך עובד</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ליווי מקצועי, אישי ומדויק – משלב החיפוש ועד סגירת העסקה
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="pointer-events-none absolute left-12 right-12 top-10 z-0 hidden lg:block h-[2px] bg-custom-gold/20" />
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative z-10 rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-custom-gold/60 bg-custom-gold text-custom-black text-base font-bold shadow-sm transition-all duration-300 motion-safe:group-hover:scale-105 motion-safe:group-hover:-translate-y-0.5 group-hover:shadow-md">
                      {index + 1}
                    </div>
                    <Icon className="text-custom-gold text-lg" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider withAccent />

      <FeaturedTestimonials />

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">
            {filteredProperties.length !== initialProperties.length ? 'תוצאות סינון' : 'נכסים אחרונים'}
          </h2>
          
          {initialProperties && initialProperties.length > 0 ? (
            filteredProperties.length > 0 ? (
              <div className="flex flex-wrap gap-6 justify-center">
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={`${property.id}-${index}`} property={property} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-lg py-10">
                לא נמצאו נכסים התואמים לחיפוש שלך.
              </p>
            )
          ) : (
            <p className="text-center text-gray-600 text-lg py-10">
              לא נמצאו נכסים זמינים כרגע.
            </p>
          )}
        </div>
      </div>
      
      <CallToActionBlock />
    </div>
  );
}
