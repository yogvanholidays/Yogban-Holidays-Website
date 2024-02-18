import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import * as apiClient from "../api-client";

const MyBookings = () => {
  const [hotelNameFilter, setHotelNameFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);

  const { data: bookings, isLoading, isError } = useQuery(
    "fetchMyBookings",
    apiClient.fetchAllBookings
  );

  const filteredBookings = bookings.filter((booking) => {
    // Filter by hotel name
    const matchesHotelName = booking.hotel.name
      .toLowerCase()
      .includes(hotelNameFilter.toLowerCase());

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

  if (!Array.isArray(bookings) || isError || !bookings || bookings.length === 0) {
    return <span>No bookings found</span>;
  }

  const handleHotelNameFilterChange = (e) => {
    setHotelNameFilter(e.target.value);
  };

  const handleStartDateFilterChange = (date) => {
    setStartDateFilter(date);
  };

  const handleEndDateFilterChange = (date) => {
    setEndDateFilter(date);
  };

  return (
    <div className="space-y-5 ">
      <h1 className="text-3xl font-bold">All Bookings</h1>
      {/* Filter Section */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Filter by Hotel Name"
          value={hotelNameFilter}
          onChange={handleHotelNameFilterChange}
          className="border p-2 rounded"
        />
        <DatePicker
          selected={startDateFilter}
          onChange={handleStartDateFilterChange}
          startDate={startDateFilter}
          endDate={endDateFilter}
          selectsStart
          placeholderText="Start Date"
          className="border p-2 rounded"
        />
        <DatePicker
          selected={endDateFilter}
          onChange={handleEndDateFilterChange}
          startDate={startDateFilter}
          endDate={endDateFilter}
          selectsEnd
          placeholderText="End Date"
          className="border p-2 rounded"
        />
      </div>

      {filteredBookings.map((booking) => (
        <div
          key={booking.razorpay_payment_id}
          className="flex flex-wrap border border-gray-300 rounded-lg p-4 relative items-center gap-4"
        >
          <div>
            <img
              src={booking.hotel.imageUrls[0]}
              alt="Hotel"
              className="w-60 object-cover rounded-md"
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
