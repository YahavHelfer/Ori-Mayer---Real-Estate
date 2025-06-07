// frontend/src/pages/sold.tsx
import Head from 'next/head';
import PropertyCard from '../components/PropertyCard';
import HeroSlider, { FilterValues } from '../components/HeroSlider'; // ייבוא רכיבים
import { GetServerSideProps } from 'next';
import type { Property } from '../types';
import React, { useState, useEffect } from 'react';

interface SoldPageProps {
  initialSoldProperties: Property[];
}

export const getServerSideProps: GetServerSideProps<SoldPageProps> = async (context) => {
  let initialSoldProperties: Property[] = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API URL not configured");
      return { props: { initialSoldProperties: [] } };
    }
    //  מושך נכסים שנמכרו/הושכרו
    const res = await fetch(`${apiUrl}/api/properties/sold`); 

    if (res.ok) {
      initialSoldProperties = await res.json();
    } else {
      console.error("Failed to fetch sold properties from API:", res.status, await res.text());
    }
  } catch (error) {
    console.error("Error fetching sold properties in getServerSideProps:", error);
  }

  return {
    props: {
      initialSoldProperties,
    },
  };
}

export default function SoldPage({ initialSoldProperties }: SoldPageProps) {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialSoldProperties);

  useEffect(() => {
    setFilteredProperties(initialSoldProperties);
  }, [initialSoldProperties]);

  //  הוספנו את פונקציית הסינון גם כאן
  const handlePropertySearch = (filters: FilterValues) => {
    let tempProperties = [...initialSoldProperties];
    // ... (כאן אפשר להוסיף את כל לוגיקת הסינון אם רוצים לסנן גם נכסים שנמכרו) ...
    // למשל, סינון לפי מיקום:
    if (filters.location && filters.location.trim() !== '') {
      const searchTerm = filters.location.toLowerCase().trim();
      tempProperties = tempProperties.filter(property =>
        (property.fullAddress && property.fullAddress.toLowerCase().includes(searchTerm)) ||
        (property.city && property.city.toLowerCase().includes(searchTerm))
      );
    }
    setFilteredProperties(tempProperties);
  };

  // גובה נמוך יותר ל-Hero Slider
  const sliderHeightClass = "h-[50vh] md:h-[45vh]"; 

  return (
    <div>
      <Head>
        <title>נכסים שנמכרו/הושכרו - אורי מאיר נדל"ן</title>
        <meta name="description" content="רשימת נכסים שנמכרו או הושכרו לאחרונה" />
      </Head>

      <HeroSlider onSearch={handlePropertySearch} heightClass={sliderHeightClass} />

      {/* הוספת container וריווחים כדי למנוע פריסה על כל הדף */}
      <div className="container mx-auto px-4 py-8 sm:py-12" dir="rtl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
          נכסים שנמכרו / הושכרו
        </h1>
        
        {filteredProperties && filteredProperties.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {filteredProperties.map((property) => {
              // קביעת התווית לפי סוג העסקה
              const label = property.transactionType?.includes('השכרה') ? 'הושכר' : 'נמכר';
              return (
                // העברת התווית כ-prop לכרטיס
                <PropertyCard key={property.id} property={property} statusLabel={label} />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg py-10">
            לא נמצאו נכסים שנמכרו או הושכרו לאחרונה.
          </p>
        )}
      </div>
    </div>
  );
}