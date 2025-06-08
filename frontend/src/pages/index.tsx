// frontend/src/pages/index.tsx
import Head from 'next/head';
import PropertyCard from '../components/PropertyCard';
import HeroSlider, { FilterValues } from '../components/HeroSlider';
import AboutBlock from '../components/AboutBlock';
import ServicesBlock from '../components/ServicesBlock';
import FeaturedTestimonials from '../components/FeaturedTestimonials';
import CallToActionBlock from '../components/CallToActionBlock';
import { GetStaticProps } from 'next'; // <<< שינוי כאן
import type { Property } from '../types';
import React, { useState, useEffect } from 'react';

interface HomePageProps {
  initialProperties: Property[];
}

// vvv שינוי שם הפונקציה ל-getStaticProps והוספת revalidate vvv
export const getStaticProps: GetStaticProps<HomePageProps> = async (context) => {
  let initialProperties: Property[] = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API URL not configured in .env.local");
      return { props: { initialProperties: [] }, revalidate: 60 }; // עדיין נחזיר revalidate גם במקרה שגיאה
    }
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

  useEffect(() => {
    setFilteredProperties(initialProperties);
  }, [initialProperties]);

  const handlePropertySearch = (filters: FilterValues) => {
    // ... לוגיקת הסינון נשארת זהה ...
    console.log("Search filters received:", filters); 
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

      <HeroSlider onSearch={handlePropertySearch} /> 

      <AboutBlock />
      <ServicesBlock />
      <FeaturedTestimonials />

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">
            {filteredProperties.length !== initialProperties.length ? 'תוצאות סינון' : 'נכסים אחרונים'}
          </h2>
          
          {initialProperties && initialProperties.length > 0 ? (
            filteredProperties.length > 0 ? (
              <div className="flex flex-wrap gap-6 justify-center">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
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