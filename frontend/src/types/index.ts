// src/types/index.ts

export interface Property {
  id: string;
  transactionType?: string | null;
  propertyType?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  fullAddress?: string | null;
  price?: number | null;
  currency?: string | null;
  rooms?: number | null;
  floor?: number | null;
  totalFloors?: number | null;
  area?: number | null;
  hasBalcony?: boolean | null;
  images?: string[] | null;
  agentName?: string | null;
  agentPhone?: string | null;
  isSoldOrRented?: boolean | null;
  hasElevator?: boolean; // הוספה של השדה החסר
  officeDetails?: {
    tel1?: string;
  };
}

// 👇 עדכנתי את הטיפוס הזה שיתאים בדיוק לנתונים שלך
export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  text: string;
  avatarUrl?: string;
  date?: string;
  rating?: number;
}