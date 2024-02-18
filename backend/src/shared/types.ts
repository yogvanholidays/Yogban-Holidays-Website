export type HotelType = {
  _id: string;
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
  lastUpdated: Date;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};


export type PaymentIntentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  totalCost: number;
  userId:string;
};
export type BookingType = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  hotel:HotelType;
  phoneNumber:string;
};

export type DestinationType = {
  name: string;
  illustrationImageUrl: string;
}