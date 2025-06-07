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
    // ... כל שאר השדות שהגדרת ב-PropertyCard.tsx
    images?: string[] | null;
    agentName?: string | null;
    agentPhone?: string | null;
    isSoldOrRented?: boolean | null;
    // ... וכו'
  }