// frontend/src/components/HeroSlider.tsx
"use client";
import Slider from "react-slick";
import Image from 'next/image';
import React, { useState } from 'react';

export interface FilterValues {
    location: string;
    propertyType: string;
    rooms: string;
    minPrice: string;
    maxPrice: string;
}

interface HeroSliderProps {
  onSearch: (filters: FilterValues) => void;
  heightClass?: string;
  isCompact?: boolean;
}

const images = [
  '/hero-images/hero1.jpg',
  '/hero-images/hero2.jpg',
  '/hero-images/hero3.jpg',
  '/hero-images/hero4.jpg',
];

export default function HeroSlider({ 
  onSearch, 
  heightClass = "h-[70vh] md:h-[65vh] lg:h-[calc(100vh-150px)]",
  isCompact = false
}: HeroSliderProps) {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'linear',
    arrows: false, 
  };
  
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [rooms, setRooms] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch({ location, propertyType, rooms, minPrice, maxPrice });
  };

  return (
    <div className={`relative ${heightClass} w-full text-white overflow-hidden`}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className={`relative ${heightClass} w-full`}> 
            <Image
              src={src}
              alt={`Hero image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        ))}
      </Slider>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
        
        {!isCompact && (
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-white shadow-lg">
            אורי מאיר נדל"ן
          </h1>
        )}
        
        <div className="bg-white/20 backdrop-blur-md p-3 md:p-6 rounded-lg shadow-xl w-full max-w-4xl">
          {/* ↓↓↓ שינוי הגריד: המרווחים האנכיים קטנים יותר במצב קומפקטי ↓↓↓ */}
          <form onSubmit={handleSearch} className={`grid grid-cols-2 lg:grid-cols-5 gap-x-3 ${isCompact ? 'gap-y-3' : 'gap-y-4'} lg:gap-4 items-end`} dir="rtl">
            
            <div className="col-span-2 lg:col-span-1">
              {/* ↓↓↓ תווית מוסתרת במצב קומפקטי ↓↓↓ */}
              <label htmlFor="search-location" className={`block text-sm font-medium mb-1 text-white text-right ${isCompact ? 'hidden' : ''}`}>חיפוש (עיר, רחוב, שכונה)</label>
              <input
                type="text"
                id="search-location"
                // ↓↓↓ פלייסהולדר דינמי ↓↓↓
                placeholder={isCompact ? 'חיפוש (עיר, רחוב, שכונה)' : 'לדוגמה: רוטשילד, תל אביב'}
                className="w-full p-2 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="property-type" className={`block text-sm font-medium mb-1 text-white text-right ${isCompact ? 'hidden' : ''}`}>סוג נכס</label>
              <select 
                id="property-type" 
                className="w-full p-2 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                {/* ↓↓↓ טקסט דינמי לאפשרות ברירת המחדל ↓↓↓ */}
                <option value="">{isCompact ? 'סוג נכס' : 'הכל'}</option>
                <option value="דירה">דירה</option>
                <option value="בית פרטי">בית פרטי</option>
                <option value="פנטהאוז">פנטהאוז</option>
                <option value="דופלקס">דופלקס</option>
                <option value="דירת גן">דירת גן</option>
              </select>
            </div>

            <div>
              <label htmlFor="rooms-filter" className={`block text-sm font-medium mb-1 text-white text-right ${isCompact ? 'hidden' : ''}`}>מספר חדרים</label>
              <select 
                id="rooms-filter" 
                className="w-full p-2 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              >
                <option value="">{isCompact ? 'מספר חדרים' : 'הכל'}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="5+">5+</option>
              </select>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <label htmlFor="price-range" className={`block text-sm font-medium mb-1 text-white text-right ${isCompact ? 'hidden' : ''}`}>טווח מחירים</label>
              <div className="grid grid-cols-2 gap-2">
               <input 
                 type="number" 
                 placeholder="מ-" 
                 className="w-full p-2 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
                 value={minPrice}
                 onChange={(e) => setMinPrice(e.target.value)}
               />
               <input 
                 type="number" 
                 placeholder="עד-" 
                 className="w-full p-2 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
                 value={maxPrice}
                 onChange={(e) => setMaxPrice(e.target.value)}
               />
              </div>
            </div>

            <button
              type="submit"
              className="bg-custom-gold hover:bg-opacity-80 text-custom-black font-semibold py-2.5 px-6 rounded-md transition-colors w-full self-end col-span-2 lg:col-span-1"
            >
              חיפוש
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}