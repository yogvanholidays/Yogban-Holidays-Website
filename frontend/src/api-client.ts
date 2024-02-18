import {
  BookingType,
  HotelSearchResponse,
  HotelType,
  UserType,
} from "../../backend/src/shared/types";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  }); 
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};
export const Latest = async () => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  // console.log(response.json);
  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  amount: number,
  currency?: string
): Promise<unknown> => {
  try {
    console.log("trying payment");
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, currency }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create payment intent");
    }

    const data = await response.json();
    return data.order; // Assuming the response includes the order object
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
};

export const validatePayment = async (
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string,
  amount: number,
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  checkIn: Date,
  checkOut: Date,
  adultCount: number,
  childCount: number,
  hotel: HotelType,
  phoneNumber:string
) => {
  try {
    const validateRes = await fetch(
      `${API_BASE_URL}/api/hotels/order/validate`,
      {
        method: "POST",
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          amount,
          userId,
          firstName,
          lastName,
          email,
          checkIn,
          checkOut,
          adultCount,
          childCount,
          hotel,
          phoneNumber
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonRes = await validateRes.json();
    // console.log(jsonRes);
    return jsonRes;
  } catch (error) {
    console.error("Error creating payment signature:", error);
    throw new Error("Failed to create payment signature");
  }
};

export const fetchBookings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hotels/getUserBookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // If the response is not successful, throw an error
    if (!response.ok) {
      throw new Error("Error fetching bookings");
    }

    // Parse response JSON
    const data = await response.json();
    data.data?.reverse()
    // Return the fetched bookings
    return data.data; // Adjust data structure if needed
  } catch (error) {
    // Handle any errors and return an internal server error response
    console.error("Error fetching bookings:", error);
    return { message: "Internal Server Error" };
  }
};

export const fetchAllBookings = async (): Promise<BookingType[]> => {
  // Fetch all bookings
  const response = await fetch(`${API_BASE_URL}/api/hotels/getAllBookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // If the response is not successful, throw an error
  if (!response.ok) {
    throw new Error("Error fetching bookings");
  }

  // Parse response JSON
  const data = await response.json();
  data.data?.reverse()
  // Return the fetched bookings
  // return { bookings: data.data }; // Adjust data structure if needed
  return data.data;
};

export const addDestination = async (destinationFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/destinations`, {
    method: "POST",
    credentials: "include",
    body: destinationFormData,
  }); 
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};


export const getDestinations = async () => {
  const response = await fetch(`${API_BASE_URL}/api/destinations`);
  if (!response.ok) {
    throw new Error("Failed to fetch destinations");
  }

  return response.json();
};

export const searchDestinations = async (searchTerm) => {
  const response = await fetch(`${API_BASE_URL}/api/destinations?searchTerm=${searchTerm}`, {
    method: "GET",
    credentials: "include",
  }); 
  if (!response.ok) {
    throw new Error("Failed to search destinations");
  }
  return response.json();
};

export const deleteDestination = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/destinations/${id}`, {
    method: "DELETE",
    credentials: "include",
  }); 
  if (!response.ok) {
    throw new Error("Failed to delete destination");
  }
};

export const searchHotelsToDelete = async (searchTerm) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels?searchTerm=${searchTerm}`, {
    method: "GET",
    credentials: "include",
  }); 
  if (!response.ok) {
    throw new Error("Failed to search hotels");
  }
  return response.json();
};

export const deleteHotel = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
    method: "DELETE",
    credentials: "include",
  }); 
  if (!response.ok) {
    throw new Error("Failed to delete hotel");
  }
};

