// frontend/src/components/MapDisplay.tsx
"use client"; //  רכיבי מפה אינטראקטיביים בדרך כלל צריכים להיות Client Components

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; //  לייבוא אייקונים דיפולטיים אם צריך

//  תיקון לבעיה נפוצה עם אייקונים דיפולטיים ב-Leaflet עם Webpack/Next.js
// (ודא שיש לך את הקבצים האלה בתיקיית public/leaflet-images או שנה את הנתיבים)
//  אפשרות אחרת היא להשתמש ב-CDN לאייקונים, או לא להגדיר את זה אם האייקונים עובדים לך.
const defaultIcon = new L.Icon({
    iconUrl: '/leaflet-images/marker-icon.png', // ודא שהקובץ קיים
    iconRetinaUrl: '/leaflet-images/marker-icon-2x.png', // ודא שהקובץ קיים
    shadowUrl: '/leaflet-images/marker-shadow.png', // ודא שהקובץ קיים
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface MapDisplayProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  popupText?: string;
}

const MapDisplay = ({ latitude, longitude, zoom = 15, popupText }: MapDisplayProps) => {
  if (typeof window === 'undefined') {
    //  אל תרנדר את המפה בצד השרת, כי Leaflet תלוי באובייקטי דפדפן
    return null;
  }

  //  ודא שהקואורדינטות תקינות לפני רינדור המפה
  if (isNaN(latitude) || isNaN(longitude)) {
    console.warn("Invalid coordinates for map:", latitude, longitude);
    return <p className="text-red-500">קואורדינטות לא תקינות להצגת מפה.</p>;
  }

  const position: L.LatLngExpression = [latitude, longitude];

  return (
    <MapContainer className='z-0' center={position} zoom={zoom} style={{ height: '400px', width: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={defaultIcon}>
        {popupText && (
          <Popup>
            {popupText}
          </Popup>
        )}
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay;