export interface OfficeDetails {
  office?: string;
  officeName?: string;
  tel1?: string;
  email?: string;
  officeCity?: string;
  officeAddress?: string;
  description?: string;
}

export interface Property {
  id: string;

  transactionType?: string | null;   // מכירה / השכרה
  propertyType?: string | null;      // דירה / קוטג' וכו'
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
  isSoldOrRented?: boolean | null;
  hasElevator?: boolean | null;

  description?: string | null;       // שדה לתיאור, למשל מהcomments2 ב-XML

  direction?: string | null;         // מז/מע/דר וכו'

  parking?: string | null;            // יש / אין / רשומה

  renovated?: boolean | null;
  mamad?: boolean | null;             // ממ"ד
  bars?: boolean | null;              // סורגים
  warehouse?: boolean | null;
  disabledAccess?: boolean | null;

  entryDate?: string | null;          // תאריך כניסה, מחרוזת

  front?: string | null;              // חזית
  kitchen?: string | null;
  toilet?: string | null;
  airConditioning?: string | null;
  boiler?: string | null;
  cellar?: string | null;

  images?: string[] | null;

  agentName?: string | null;
  agentPhone?: string | null;

  officeDetails?: OfficeDetails;
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
