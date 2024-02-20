import { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import { BookingType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

const ArrivingToday = () => {
  const [arrivingGuests, setArrivingGuests] = useState<BookingType[]>([]);

  useEffect(() => {
    const fetchArrivingGuests = async () => {
      try {
        const bookings = await apiClient.fetchAllBookings();
        const today = new Date();
        const arrivingToday = bookings.filter((booking) => {
          const checkInDate = new Date(booking.checkIn);
          return checkInDate.toDateString() === today.toDateString();
        });
        setArrivingGuests(arrivingToday);
      } catch (error) {
        console.error("Error fetching arriving guests:", error);
      }
    };

    fetchArrivingGuests();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-row text-center items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Arriving Today</h1>
        <Link
          to="/view-all-bookings"
          className="flex bg-red-600 text-white text-xl font-bold p-2 hover:bg-red-500"
        >
          View All Bookings
        </Link>
      </div>
      <div className="overflow-x-auto max-w-screen-xl mx-auto mb-12">
        <div className="flex flex-nowrap gap-4">
          {arrivingGuests.map((booking) => (
            <div
              key={booking.razorpay_payment_id}
              className="flex-shrink-0 w-96 border border-gray-300 rounded-lg p-4 relative items-center gap-4"
            >
              <div className="flex flex-col">
                <Link
                  to={`/detail/${booking.hotel._id}`}
                  className="text-xl font-bold hover:underline"
                >
                  {booking.hotel.name}
                </Link>
                <div>
                  <span className="font-bold mr-2">Booked By:</span>
                  <span>
                    {booking.firstName} {booking.lastName}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Phone Number: </span>
                  <span className="mr-2">{booking.phoneNumber}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">Email: </span>
                  <span className="mr-2">{booking.email}</span>
                </div>
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
              {booking.phoneNumber && (
                <a
                  href={`tel:${booking.phoneNumber}`}
                  className="bg-red-500 text-white px-4 py-2 rounded m-2 absolute bottom-0 right-0"
                >
                  Call
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrivingToday;
