/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";


const MyBookings = () => {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery("fetchMyBookings", apiClient.fetchBookings);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (
    !Array.isArray(bookings) ||
    isError ||
    !bookings ||
    bookings.length === 0
  ) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {bookings.map((booking) => (
        <div className="relative">
          <div
            key={booking.razorpay_payment_id}
            className="border border-gray-300 rounded-lg p-4 flex items-center gap-4"
          >
            <div>
              <img
                src={booking.hotel.imageUrls[0]}
                alt="Hotel"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <Link
                to={`/detail/${booking.hotel._id}`}
                className="text-xl font-bold hover:underline"
              >
                {booking.hotel.name}
              </Link>
              <div className="text-sm">
                {booking.hotel.type}, {booking.hotel.starRating} Star
              </div>
              {/* <div>
              <span className="font-bold mr-2">Booked By:</span>
              <span>
                {booking.firstName} {booking.lastName} ({booking.email},
                {booking.phoneNumber})
              </span>
            </div>
            <div>
              <span className="font-bold mr-2">Phone Number: </span>
              <span className="mr-2">{booking.phoneNumber}</span>
              <span className="font-bold mr-2">Email: </span>
              <span className="mr-2">{booking.email}</span>
            </div> */}
              <div>
                <span className="font-bold mr-2">Dates: </span>
                <span>
                  {new Date(booking.checkIn).toDateString()} -{" "}
                  {new Date(booking.checkOut).toDateString()}
                </span>
              </div>
              <div>
                <span className="font-bold mr-2">Guests:</span>
                <span>
                  {booking.adultCount} adults, {booking.childCount} children
                </span>
              </div>
              <div>
                <span className="font-bold mr-2">Total Cost:</span>
                <span>{booking.totalCost}</span>
              </div>
              <div>
                <span className="font-bold mr-2">Payment ID:</span>
                <span>{booking.razorpay_payment_id}</span>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default MyBookings;
