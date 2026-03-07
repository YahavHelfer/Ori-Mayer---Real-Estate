// frontend/src/components/HeroSlider.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
  heightClass = "h-[500px] md:h-[600px]",
  isCompact = false
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [rooms, setRooms] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    if (images.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch({ location, propertyType, rooms, minPrice, maxPrice });
  };

  return (
    <div className={`relative ${heightClass} w-full text-white overflow-hidden`}>
      <div className="relative h-full w-full">
        {images.map((src, index) => (
          <div
            key={index}
            className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt={`Hero image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover ${
                index === currentSlide ? 'hero-zoom' : ''
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none motion-reduce:transform-none ${
              index === currentSlide ? 'bg-white scale-110 motion-reduce:scale-100' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      <div className="absolute bottom-11 left-1/2 -translate-x-1/2 z-20 w-24 h-1 rounded-full bg-white/20 overflow-hidden pointer-events-none">
        <div key={currentSlide} className="hero-progress-fill h-full rounded-full bg-white/80" />
      </div>

      <div className="hero-entrance absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 py-6 sm:px-6">
        
        {!isCompact && (
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 md:mb-8 text-white shadow-lg">
            אורי מאיר נדל"ן
          </h1>
        )}

        <p className="text-lg sm:text-xl md:text-2xl font-medium text-white/95 mb-4 sm:mb-5">
          מצאו את הנכס הבא שלכם
        </p>
        
        <div className="bg-white/25 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl px-4 py-3 sm:px-6 sm:py-4 md:p-6">
          {/* ↓↓↓ שינוי הגריד: המרווחים האנכיים קטנים יותר במצב קומפקטי ↓↓↓ */}
          <form onSubmit={handleSearch} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-2 sm:gap-x-3 ${isCompact ? 'gap-y-3' : 'gap-y-4 sm:gap-y-4'} lg:gap-4 items-end`} dir="rtl">
            
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              {/* ↓↓↓ תווית מוסתרת במצב קומפקטי ↓↓↓ */}
              <label htmlFor="search-location" className={`block text-sm font-medium mb-1 text-white text-right ${isCompact ? 'hidden' : ''}`}>חיפוש (עיר, רחוב, שכונה)</label>
              <input
                type="text"
                id="search-location"
                // ↓↓↓ פלייסהולדר דינמי ↓↓↓
                placeholder={isCompact ? 'חיפוש (עיר, רחוב, שכונה)' : 'לדוגמה: רוטשילד, תל אביב'}
                className="w-full p-3 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="property-type" className={`block text-sm font-medium mb-1 text-white text-right ${isCompact ? 'hidden' : ''}`}>סוג נכס</label>
              <select 
                id="property-type" 
                className="w-full p-3 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
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
                className="w-full p-3 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
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

            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <label htmlFor="price-range" className={`block text-sm font-medium mb-1 text-white text-right ${isCompact ? 'hidden' : ''}`}>טווח מחירים</label>
              <div className="grid grid-cols-2 gap-2">
               <input 
                 type="number" 
                 placeholder="מ-" 
                 className="w-full p-3 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
                 value={minPrice}
                 onChange={(e) => setMinPrice(e.target.value)}
               />
               <input 
                 type="number" 
                 placeholder="עד-" 
                 className="w-full p-3 md:p-2.5 rounded-md border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-right"
                 value={maxPrice}
                 onChange={(e) => setMaxPrice(e.target.value)}
               />
              </div>
            </div>

            <button
              type="submit"
              className="col-span-1 sm:col-span-2 lg:col-span-1 w-full self-end rounded-md bg-custom-gold px-6 py-3 sm:py-2.5 text-custom-black font-semibold transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white/60 active:bg-opacity-100 motion-safe:active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <FaSearch aria-hidden="true" className="text-sm" />
              <span>חיפוש</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
