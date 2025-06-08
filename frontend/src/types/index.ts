// frontend/src/types/index.ts

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
  description?: string;
  evacuationDate?: string | null;
  directions?: string | null;
  boiler?: string | null;
  officeDetails?: any; // You can define a more specific type for this

  // 👇 --- הוספתי את השדות הבוליאניים החסרים --- 👇
  hasParking?: boolean | null;
  hasElevator?: boolean | null;
  numberOfElevators?: number;
  hasAirConditioning?: boolean | null;
  airConditioningType?: string | null;
  hasStorage?: boolean | null;
  hasSecureRoom?: boolean | null;
  isAccessible?: boolean | null;
  isRenovated?: boolean | null;
  hasBars?: boolean | null;
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  text: string;
  avatarUrl?: string;
  date?: string;
  rating?: number;
}