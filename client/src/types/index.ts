export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  googleId?: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
};

export enum UserRole {
  Customer = "CUSTOMER",
  Business = "BUSINESS"
}

export type Booking = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  totalCost: number;
  accomodationId: string;
  userId: string;
};

export type Accomodation = {
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
  starRating: number;
  imageUrls: string[];
  lastUpdated: string;
};
