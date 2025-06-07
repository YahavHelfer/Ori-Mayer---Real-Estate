// frontend/src/components/PropertyCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Property } from '../types';

// ... (ייבוא אייקונים ורכיב BooleanDisplay אם הם כאן) ...
import { FaBed, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { LuRectangleVertical } from "react-icons/lu";
import { BsBuilding } from "react-icons/bs";
import { MdElevator } from "react-icons/md";

const BooleanDisplay = ({ value }: { value?: boolean | null }) => {
  if (value === null || value === undefined) return <span className="text-gray-500">-</span>;
  return value ? <FaCheckCircle className="text-green-500" title="כן" /> : <FaTimesCircle className="text-red-500" title="לא" />;
};


interface PropertyCardProps {
  property: Property;
  statusLabel?: string; // <<< Prop חדש לתווית (למשל, "נמכר" או "הושכר")
}

export default function PropertyCard({ property, statusLabel }: PropertyCardProps) {
  const mainImage = property.images && property.images.length > 0 && property.images[0]
                    ? property.images[0]
                    : '/placeholder-image.jpg';

  return (
    <div 
      dir="rtl"
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full sm:w-[340px] flex flex-col"
    >
      <Link href={`/properties/${property.id}`} className="block flex flex-col flex-grow">
        <div className="relative w-full h-56">
          <Image
            src={mainImage}
            alt={property.fullAddress || 'תמונת הנכס'}
            fill
            style={{ objectFit: 'cover' }}
            priority={true}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
            className="group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
            }}
          />

          {/* הצגת תווית "סוג עסקה" או "נמכר" */}
          <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
            {statusLabel && ( // <<< מציג את תווית הסטטוס אם היא קיימת
                <div className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {statusLabel}
                </div>
            )}
            {!statusLabel && property.transactionType && ( // מציג סוג עסקה רק אם הנכס לא נמכר
              <div className="bg-custom-gold text-custom-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                {property.transactionType}
              </div>
            )}
          </div>
          
        </div>

        <div className="p-5 flex flex-col flex-grow justify-between">
          {/* ... (שאר קוד הכרטיס נשאר אותו דבר) ... */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate group-hover:text-custom-gold transition-colors min-h-[2.5em] leading-tight">
              {property.fullAddress || property.street || 'כתובת לא זמינה'}
            </h3>
            {property.neighborhood && (
              <p className="text-sm text-gray-500 mb-3 truncate">
                {property.neighborhood}{property.city && property.neighborhood !== property.city ? `, ${property.city}` : ''}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700 mb-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <FaBed className="text-custom-gold ml-1" size="1.1em" />
              <span>{property.rooms ? `${property.rooms} חד'` : 'חדרים: -'}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <LuRectangleVertical className="text-custom-gold ml-1" size="1.1em" />
              <span>{property.area ? `${property.area} מ"ר` : 'שטח: -'}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <BsBuilding className="text-custom-gold ml-1" size="1.1em" />
              <span>{property.floor !== null ? `קומה ${property.floor}` : 'קומה: -'} {property.totalFloors ? `מתוך ${property.totalFloors}` : ''}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <MdElevator className="text-custom-gold ml-1" size="1.1em" />
              <span className="flex items-center">
                מעלית:&nbsp;<BooleanDisplay value={property.hasElevator} />
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-2xl font-bold text-custom-black mb-2">
              {property.price ? `₪${property.price.toLocaleString()}` : 'מחיר לא צוין'}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}