// frontend/src/pages/sales.tsx
import Head from 'next/head';
import PropertyCard from '../components/PropertyCard';
import HeroSlider, { FilterValues } from '../components/HeroSlider';
import { GetStaticProps } from 'next'; // <<< שינוי כאן
import type { Property } from '../types';
import React, { useState, useEffect } from 'react';

interface SalesPageProps {
  initialSaleProperties: Property[];
}

// vvv שינוי שם הפונקציה ל-getStaticProps והוספת revalidate vvv
export const getStaticProps: GetStaticProps<SalesPageProps> = async (context) => {
  let initialSaleProperties: Property[] = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API URL not configured");
      return { props: { initialSaleProperties: [] }, revalidate: 60 };
    }
    // משיכת נכסים למכירה
    const res = await fetch(`${apiUrl}/api/properties/sale`);
    
    if (res.ok) {
      initialSaleProperties = await res.json();
    } else {
      console.error("Failed to fetch sale properties from API:", res.status, await res.text());
    }
  } catch (error) {
    console.error("Error fetching sale properties in getStaticProps:", error);
  }

  return {
    props: {
      initialSaleProperties,
    },
    revalidate: 3600, // <<< הוספנו revalidate. רענון הנתונים כל שעה
  };
}

export default function SalesPage({ initialSaleProperties }: SalesPageProps) {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialSaleProperties);

  useEffect(() => {
    setFilteredProperties(initialSaleProperties);
  }, [initialSaleProperties]);

  const handlePropertySearch = (filters: FilterValues) => {
    console.log("Sale search filters received:", filters);
    let tempProperties = [...initialSaleProperties];
    
    // לוגיקת הסינון נשארת זהה
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

  // גובה נמוך יותר ל-Hero Slider
  const sliderHeightClass = "h-[70vh] md:h-[45vh]"; 

  return (
    <div>
      <Head>
        <title>נכסים למכירה - אורי מאיר נדל"ן</title>
        <meta name="description" content="חפש ומצא נכסים למכירה בתל אביב והסביבה." />
      </Head>

      <HeroSlider onSearch={handlePropertySearch} heightClass={sliderHeightClass} />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
          {filteredProperties.length !== initialSaleProperties.length ? 'תוצאות סינון למכירה' : 'נכסים למכירה'}
        </h1>
        
        {filteredProperties && filteredProperties.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg py-10">
            לא נמצאו נכסים למכירה התואמים לחיפוש שלך.
          </p>
        )}
      </div>
    </div>
  );
}