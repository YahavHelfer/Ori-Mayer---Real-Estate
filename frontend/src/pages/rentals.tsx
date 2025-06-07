// frontend/src/pages/rentals.tsx
import Head from 'next/head';
import PropertyCard from '../components/PropertyCard';
import HeroSlider, { FilterValues } from '../components/HeroSlider';
import { GetStaticProps } from 'next'; // <<< שינוי כאן
import type { Property } from '../types';
import React, { useState, useEffect } from 'react';

interface RentalsPageProps {
  initialRentalProperties: Property[];
}

// vvv שינוי שם הפונקציה ל-getStaticProps והוספת revalidate vvv
export const getStaticProps: GetStaticProps<RentalsPageProps> = async (context) => {
  let initialRentalProperties: Property[] = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API URL not configured");
      return { props: { initialRentalProperties: [] }, revalidate: 60 };
    }
    // משיכת נכסים להשכרה
    const res = await fetch(`${apiUrl}/properties/rent`); 
    
    if (res.ok) {
      initialRentalProperties = await res.json();
    } else {
      console.error("Failed to fetch rental properties from API:", res.status, await res.text());
    }
  } catch (error) {
    console.error("Error fetching rental properties in getStaticProps:", error);
  }

  return {
    props: {
      initialRentalProperties,
    },
    revalidate: 3600, // <<< הוספנו revalidate. רענון הנתונים כל שעה
  };
}

export default function RentalsPage({ initialRentalProperties }: RentalsPageProps) {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialRentalProperties);

  useEffect(() => {
    setFilteredProperties(initialRentalProperties);
  }, [initialRentalProperties]);

  const handlePropertySearch = (filters: FilterValues) => {
    console.log("Rental search filters received:", filters);
    let tempProperties = [...initialRentalProperties];

    // לוגיקת הסינון
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

  const sliderHeightClass = "h-[35vh] md:h-[45vh]"; 

  return (
    <div>
      <Head>
        <title>נכסים להשכרה - אורי מאיר נדל"ן</title>
        <meta name="description" content="חפש ומצא נכסים להשכרה בתל אביב והסביבה." />
      </Head>

      <HeroSlider onSearch={handlePropertySearch} heightClass={sliderHeightClass} />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
          {filteredProperties.length !== initialRentalProperties.length ? 'תוצאות סינון להשכרה' : 'נכסים להשכרה'}
        </h1>
        
        {filteredProperties && filteredProperties.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg py-10">
            לא נמצאו נכסים להשכרה התואמים לחיפוש שלך.
          </p>
        )}
      </div>
    </div>
  );
}