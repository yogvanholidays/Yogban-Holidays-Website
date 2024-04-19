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
  amenities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  reviews:any;
  bookingdotcom: string;
  airbnb: string;
  makemytrip: string;
  googleTravels: string;
  agoda: string;
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
  userId: string;
};
export type BookingType = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  hotel: HotelType;
  phoneNumber: string;
};

export type DestinationType = {
  [x: string]: any;
  name: string;
  illustrationImageUrl: string;
};

export type ListPropertyRequestType = {
  [x: string]: any;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  propertyName: string;
  propertyLocation: string;
  propertyType: string;
  rooms: string;
  hearAbout: string;
  photosLink: string;
  propertyDescription: string;
};

export type CouponType = {
  [x: string]: any;
  couponType: string;
  amount: number;
  couponCode: string;
  couponMessage: string;
  minNights: number;
  expiryDate: string | null;
  neverExpires: boolean;
  creationDate: string;
};

export type BlogType = {
  title: string;
  thumbnailImageUrl: string;
  content: string;
  author: string;
  publishDate: string;
};

export type CarouselImageType = {
  [x: string]: string;
  imageUrl: string;
  featuredText:string;
  ButtonLink:string;
};
export type RatingType = {
  rating:string;
};
