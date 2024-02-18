import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: bookings, isLoading, isError } = useQuery(
    "fetchMyBookings",
    apiClient.fetchBookings
  );
  
  // Check if data is still loading
  if (isLoading) {
    return <span>Loading...</span>;
  }
  
  // Check if there was an error fetching the data
  if (isError) {
    return <span>Error fetching bookings</span>;
  }
  
  // Check if bookings data is undefined or empty
  if (!Array.isArray(bookings) || !bookings || bookings.length === 0) {
    return <span>No bookings found</span>;
  }
  
  // Now you can safely access the first booking
  console.log(bookings)
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="border border-slate-300 rounded-2xl p-8 gap-5"
        >
          {/* <div className="lg:w-full lg:h-[100px]">
          </div> */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {booking.name} {/* Assuming name is part of the booking object */}
              {/* <div className="text-xs font-normal">
                {booking.city}, {booking.country} 
              </div> */}
            </div>
            <div>
              <div>
                <span className="font-bold mr-2">Dates: </span>
                <span>
                  {new Date(booking.checkIn).toDateString()} -
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
                <span>${booking.totalCost}</span> {/* Assuming totalCost is part of the booking object */}
              </div>
              <div>
                <span className="font-bold mr-2">Payment ID:</span>
                <span>{booking.razorpay_payment_id}</span> {/* Assuming razorpay_payment_id is part of the booking object */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
