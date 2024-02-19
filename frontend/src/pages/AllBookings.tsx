/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import * as apiClient from "../api-client";

const MyBookings = () => {
  const [hotelNameFilter, setHotelNameFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState<Date>();
  const [endDateFilter, setEndDateFilter] = useState<Date>();

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery("fetchMyBookings", apiClient.fetchAllBookings);

  const filteredBookings = bookings?.filter((booking) => {
    // Filter by hotel name
    const matchesHotelName =
      booking.hotel.name
        .toLowerCase()
        .includes(hotelNameFilter.toLowerCase()) ||
      booking.firstName.includes(hotelNameFilter.toLowerCase()) ||
      booking.lastName.includes(hotelNameFilter.toLowerCase()) ||
      booking.email.includes(hotelNameFilter.toLowerCase()) ||
      booking.phoneNumber?.includes(hotelNameFilter.toLowerCase());

    // Filter by selected dates
    const bookingCheckInDate = new Date(booking.checkIn);
    const bookingCheckOutDate = new Date(booking.checkOut);
    const isWithinSelectedDates =
      (!startDateFilter || bookingCheckInDate >= startDateFilter) &&
      (!endDateFilter || bookingCheckOutDate <= endDateFilter);

    return matchesHotelName && isWithinSelectedDates;
  });

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

  const handleHotelNameFilterChange = (e:any) => {
    setHotelNameFilter(e.target.value);
  };

  const handleStartDateFilterChange = (date:Date) => {
    setStartDateFilter(date);
  };

  const handleEndDateFilterChange = (date:Date) => {
    setEndDateFilter(date);
  };

  return (
    <div className="space-y-5 ">
      <h1 className="text-3xl font-bold">All Bookings</h1>
      {/* Filter Section */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Filter by Name, Hotel Name, Email or Phone"
          value={hotelNameFilter}
          onChange={handleHotelNameFilterChange}
          className="border p-2 rounded flex-1"
        />
        <div className="flex gap-4 datePickerBar">
          <DatePicker
            selected={startDateFilter}
            onChange={handleStartDateFilterChange}
            startDate={startDateFilter}
            endDate={endDateFilter}
            selectsStart
            placeholderText="Start Date"
            className="border p-2 rounded flex-1 datePickerBar"
          />
          <DatePicker
            selected={endDateFilter}
            onChange={handleEndDateFilterChange}
            startDate={startDateFilter}
            endDate={endDateFilter}
            selectsEnd
            placeholderText="End Date"
            className="border p-2 rounded flex-1 datePickerBar"
          />
        </div>
      </div>

      {filteredBookings?.map((booking) => (
        <div
          key={booking.razorpay_payment_id}
          className="flex flex-wrap border border-gray-300 rounded-lg p-4 relative items-center gap-4"
        >
          <div>
            <img
              src={booking.hotel.imageUrls[0]}
              alt="Hotel"
              className="w-60 object-cover rounded-md flex-1"
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
            <div>
              <span className="font-bold mr-2">Booked By:</span>
              <span>
                {booking.firstName} {booking.lastName}
              </span>
            </div>
            <div>
              <span className="font-bold mr-2">Phone Number: </span>
              <span className="mr-2">{booking.phoneNumber}</span>
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
              className="absolute bottom-0 right-0 bg-red-500 text-white px-4 py-2 rounded m-2"
            >
              Call
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
