// frontend/src/pages/properties/[id].tsx

import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import type { Property } from '../../types';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// ייבוא אייקונים
import { FaBed, FaCheckCircle, FaTimesCircle, FaWhatsapp, FaWarehouse, FaShieldAlt, FaPaintBrush, FaKey } from 'react-icons/fa';
import { LuRectangleVertical } from "react-icons/lu";
import { BsBuilding, BsCalendarCheck } from "react-icons/bs";
import { MdElevator, MdOutlineBalcony, MdOutlineLocalParking, MdAcUnit } from "react-icons/md";
import { GrAccessibility } from "react-icons/gr";

// ייבוא ל-Lightbox
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// ודא שה-CSS של Lightbox ו-Thumbnails מיובא בקובץ _app.tsx

// ייבוא דינמי של רכיב המפה והמודל
const MapDisplay = dynamic(() => import('../../components/MapDisplay'), { ssr: false });
const ContactPropertyModal = dynamic(() => import('../../components/ContactPropertyModal'), { ssr: false });

interface PropertyPageProps {
  property: Property | null;
  coordinates?: { lat: number; lon: number } | null;
}

// ... (הפונקציות geocodeAddress, getStaticPaths, getStaticProps נשארות כפי שהן) ...
async function geocodeAddress(address: string, city?: string | null): Promise<{ lat: number; lon: number } | null> {
  let queryAddress = address;
  if (city && address && !address.toLowerCase().includes(city.toLowerCase())) {
    queryAddress = `${address}, ${city}`;
  }
  if (!queryAddress || queryAddress.trim() === '') return null;
  const finalQueryAddress = queryAddress.toLowerCase().includes('israel') ? queryAddress : `${queryAddress}, Israel`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(finalQueryAddress)}&format=json&limit=1&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Ori Mayer Real Estate Website/1.0 (https://www.omrealestate.co.il ; orimayerealestate@gmail.com'
      }
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      if (lat >= 29 && lat <= 34 && lon >= 34 && lon <= 36) { // טווח גס לישראל
        return { lat, lon };
      }
      return null;
    }
    return null;
  } catch (error) {
    console.error(`Geocoding error for address "${finalQueryAddress}":`, error);
    return null;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let paths: { params: { id: string } }[] = [];
  try {
    const res = await fetch(`${apiUrl}/api/properties/all-ids`); // <<< תיקון קטן כאן, הוספת /api
    if (res.ok) {
      const ids: (string | number)[] = await res.json();
      paths = ids.map(id => ({
        params: { id: String(id) },
      }));
    }
  } catch (error) {
    console.error("Error fetching property IDs for getStaticPaths:", error);
  }
  
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PropertyPageProps> = async (context) => {
  const { id } = context.params || {};
  let property: Property | null = null;
  let fetchedCoordinates: { lat: number; lon: number } | null = null;
  
  if (typeof id === 'string') {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        return { props: { property: null, coordinates: null }, revalidate: 60 };
      }
      const res = await fetch(`${apiUrl}/api/properties/${id}`);
      
      if (res.ok) {
        property = await res.json();
        if (property && (property.fullAddress || (property.street && property.city))) {
          const addressToGeocode = property.fullAddress || `${property.street || ''}, ${property.city || ''}`.replace(/^,|,$/g, '').trim();
          if (addressToGeocode) {
            fetchedCoordinates = await geocodeAddress(addressToGeocode, property.city);
          }
        }
      } else if (res.status === 404) {
        return { notFound: true };
      }
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
    }
  }

  if (!property) {
    return { notFound: true };
  }

  return {
    props: {
      property,
      coordinates: fetchedCoordinates,
    },
    revalidate: 3600,
  };
};

// רכיבי עזר
const DetailItem = ({ icon, text }: { icon?: React.ReactNode, text?: string | number | null | undefined }) => {
    if (text === null || text === undefined || String(text).trim() === '') return null;
    return (
        <div className="flex items-center text-gray-700">
            {icon && <span className="text-custom-gold ml-2 rtl:mr-0 rtl:ml-2">{icon}</span>}
            <span>{String(text)}</span>
        </div>
    );
};

const BooleanFeature = ({ label, value, icon }: { label: string, value?: boolean | null, icon?: React.ReactNode }) => {
    // לא מציגים כלום אם אין מידע (null/undefined)
    if (value === null || value === undefined) return null; 
    return (
        <div className="flex items-center text-gray-700">
            {icon && <span className="text-custom-gold ml-2 rtl:mr-0 rtl:ml-2">{icon}</span>}
            <span>{label}: </span>
            {value ? <FaCheckCircle className="text-green-500 mr-1 rtl:ml-0 rtl:mr-1" title="כן"/> : <FaTimesCircle className="text-red-500 mr-1 rtl:ml-0 rtl:mr-1" title="לא"/>}
        </div>
    );
};

const formatPhoneNumberForWhatsApp = (phone: string | null | undefined): string => {
  const defaultPhone = "972528367466";
  if (!phone) return defaultPhone;
  let cleanedPhone = phone.replace(/\D/g, ''); 
  if (cleanedPhone.startsWith("0")) {
    cleanedPhone = "972" + cleanedPhone.substring(1);
  } else if (!cleanedPhone.startsWith("972") && cleanedPhone.length === 9) {
    cleanedPhone = "972" + cleanedPhone;
  }
  return cleanedPhone.startsWith("972") && cleanedPhone.length >= 11 ? cleanedPhone : defaultPhone; 
};

// רכיב העמוד הראשי
export default function PropertyPage({ property, coordinates }: PropertyPageProps) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  if (!property) {
    return (
        <div className="container mx-auto p-8 text-center">
            <p className="text-xl text-gray-600">הנכס המבוקש לא נמצא.</p>
        </div>
    );
  }

  const lightboxSlides = property.images?.filter(imgUrl => typeof imgUrl === 'string' && imgUrl.trim() !== '').map(imgUrl => ({ src: imgUrl as string })) || [];
  const rawPhoneForWhatsApp = property.agentPhone || property.officeDetails?.tel1;
  const realtorPhoneNumberForWhatsApp = formatPhoneNumberForWhatsApp(rawPhoneForWhatsApp);
  const propertyAddressForMessage = property.fullAddress || `${property.street || ''}, ${property.city || ''}`.replace(/^,|,$/g, '').trim() || `נכס ID: ${property.id}`;
  const whatsappMessage = `שלום אורי, אני מתעניין/ת בנכס: ${propertyAddressForMessage}. אשמח לפרטים נוספים.`;
  const realtorEmailForForm = property.officeDetails?.email || "orimayerealestate@gmail.com";

  // נתונים ל-SEO
  const pageTitle = `${property.propertyType || 'נכס'} ${property.rooms ? `${property.rooms} חדרים` : ''} למכירה ב${property.street ? `${property.street},` : ''} ${property.city || 'תל אביב'} | אורי מאיר נדל"ן`;
  const pageDescription = property.description?.substring(0, 160) || `למכירה נכס במיקום מעולה: ${property.fullAddress}. פרטים נוספים באתר של אורי מאיר נדל"ן.`;
  const mainImageUrl = (lightboxSlides.length > 0) ? lightboxSlides[0].src : 'https://www.omrealestate.co.il/default-share-image.jpg';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.omrealestate.co.il';
  const pageUrl = `${siteUrl}/properties/${property.id}`;
  const structuredData = { /* ... נתונים מובנים ... */ };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8" dir="rtl">
        <Head>
            {/* ... כל תגי ה-Head שלך ... */}
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:image" content={mainImageUrl} />
            <link rel="canonical" href={pageUrl} />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
              key="product-jsonld"
            />
        </Head>

        <article className="bg-white shadow-2xl rounded-xl overflow-hidden">
            <div className="lg:flex">
                <div className="lg:w-3/5 xl:w-2/3">
                    {/* ... גלריית תמונות ... */}
                    {lightboxSlides.length > 0 ? (
                      <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] cursor-pointer group bg-gray-100" onClick={() => { setLightboxIndex(0); setOpenLightbox(true); }}>
                        <Image src={lightboxSlides[0].src} alt={`תמונה ראשית של ${property.street || 'הנכס'}`} fill style={{ objectFit: 'cover' }} className="group-hover:opacity-90 transition-opacity" priority sizes="(max-width: 768px) 100vw, 800px" />
                        {lightboxSlides.length > 1 && (<div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-sm shadow-md">לחץ להצגת כל {lightboxSlides.length} התמונות</div>)}
                      </div>
                    ) : (
                      <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] bg-gray-200 flex items-center justify-center text-gray-500">
                        <Image src="/placeholder-image.jpg" alt="אין תמונה זמינה" width={300} height={200} style={{ objectFit: 'contain' }} />
                      </div>
                    )}
                </div>

                <div className="lg:w-2/5 xl:w-1/3 p-6 flex flex-col bg-gray-50">
                    {/* ... פרטי הנכס העיקריים ... */}
                    <header className="mb-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{property.street || 'פרטי נכס'}</h1>
                        <p className="text-md text-gray-600">{property.neighborhood ? `${property.neighborhood}, ${property.city}` : property.city}</p>
                    </header>
                    <p className="text-4xl font-extrabold text-custom-gold mb-6">{property.price ? `₪${property.price.toLocaleString()}` : 'מחיר לא צוין'}</p>
                    <div className="space-y-3 text-lg text-gray-700 mb-6">
                        <DetailItem icon={<FaBed size="1.2em" />} text={property.rooms ? `${property.rooms} חדרים` : undefined} />
                        <DetailItem icon={<LuRectangleVertical size="1.2em" />} text={property.area ? `${property.area} מ"ר` : undefined} />
                        <DetailItem icon={<BsBuilding size="1.2em" />} text={property.floor !== null && property.floor !== undefined ? `קומה ${property.floor}${property.totalFloors ? ` מתוך ${property.totalFloors}` : ''}` : undefined} />
                        <BooleanFeature label="מעלית" value={property.hasElevator} icon={<MdElevator size="1.2em" />} />
                    </div>
                    <div className="mt-auto pt-6 border-t space-y-3">
                        {/* ... כפתורי יצירת קשר ... */}
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">לפרטים נוספים ותיאום:</h3>
                        <p className="text-md text-gray-800"><strong>{property.agentName || 'אורי מאיר'}</strong></p>
                        <button type="button" onClick={() => setIsContactModalOpen(true)} className="w-full inline-flex items-center justify-center bg-custom-gold text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors text-lg shadow-md">פנייה במייל לגבי הנכס</button>
                        <a href={`https://wa.me/${realtorPhoneNumberForWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors text-lg shadow-md">
                            <FaWhatsapp className="ml-2 rtl:mr-0 rtl:ml-2" size="1.3em" /> פנייה ב-WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-10">
                {property.description && (
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">אודות הנכס</h2>
                        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 whitespace-pre-line leading-relaxed">{property.description}</div>
                    </section>
                )}

                {/* 👇 --- החלק המתוקן --- 👇 */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">מאפייני הנכס</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-gray-700">
                        <BooleanFeature label="מרפסת" value={property.hasBalcony} icon={<MdOutlineBalcony size="1.2em" />} />
                        <BooleanFeature label="חניה" value={property.hasParking} icon={<MdOutlineLocalParking size="1.2em" />} />
                        <BooleanFeature label="מיזוג" value={property.hasAirConditioning} icon={<MdAcUnit size="1.2em" />} />
                        <BooleanFeature label="מחסן" value={property.hasStorage} icon={<FaWarehouse size="1.2em" />} />
                        <BooleanFeature label='ממ"ד' value={property.hasSecureRoom} icon={<FaShieldAlt size="1.2em" />} />
                        <BooleanFeature label="נגישות" value={property.isAccessible} icon={<GrAccessibility size="1.2em" />} />
                        <BooleanFeature label="משופץ" value={property.isRenovated} icon={<FaPaintBrush size="1.2em" />} />
                        <BooleanFeature label="סורגים" value={property.hasBars} icon={<FaKey size="1.2em" />} />
                        
                        {/* שדות שאינם בוליאניים */}
                        <DetailItem icon={<BsCalendarCheck />} text={property.evacuationDate ? `פינוי: ${property.evacuationDate}` : undefined} />
                        <DetailItem text={property.directions ? `כיווני אוויר: ${property.directions}` : undefined} />
                        <DetailItem text={property.boiler ? `דוד: ${property.boiler}` : undefined} />
                    </div>
                </section>

                {coordinates && (
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">מיקום הנכס</h2>
                        <div className="h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-lg border">
                            <MapDisplay latitude={coordinates.lat} longitude={coordinates.lon} popupText={property.fullAddress || 'מיקום הנכס'} />
                        </div>
                    </section>
                )}
            </div>
        </article>

        {lightboxSlides.length > 0 && (
            <Lightbox open={openLightbox} close={() => setOpenLightbox(false)} slides={lightboxSlides} index={lightboxIndex} on={{ view: ({ index: currentIndex }) => setLightboxIndex(currentIndex) }} plugins={[Zoom, Thumbnails]} />
        )}

        {property && (
            <ContactPropertyModal isOpen={isContactModalOpen} closeModal={() => setIsContactModalOpen(false)} property={property} realtorEmail={realtorEmailForForm} />
        )}
    </div>
  );
}