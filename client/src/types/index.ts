export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  bookings: Booking[];
  saves: Save[];
}

export enum UserRole {
  Customer = "CUSTOMER",
  Business = "BUSINESS"
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  avatarUrl: string | File | undefined;
}

export interface Accommodation {
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
  lastUpdated: string;
  bookings: Booking[];
  saves: Save[];
}

export interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  totalCost: number;
  accommodationId: string;
  accommodation?: Accommodation;
  userId: string;
  user?: User;
}

export interface Save {
  id: string;
  savedAt: string;
  userId: string;
  user?: User;
  accommodationId: string;
  accommodation?: Accommodation;
}

export type AccommodationFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

export type AccommodationSearchResponse = {
  data: Accommodation[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  accommodationId: string;
  paymentIntentId: string;
  totalCost: number;
};
