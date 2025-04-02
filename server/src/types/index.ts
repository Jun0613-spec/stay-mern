export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  bookings: Booking[];
};

export enum UserRole {
  BUSINESS = "BUSINESS",
  CUSTOMER = "CUSTOMER"
}

export type Accommodation = {
  id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  imageUrls: string[];
  lastUpdated: Date;

  bookings: Booking[];
};

export type Booking = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  accommodationId: string;
  accommodation?: Accommodation;
};

export type AccommodationSearchResponse = {
  data: Accommodation[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
