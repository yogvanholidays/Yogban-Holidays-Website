import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import GuestBookingForm from "../forms/BookingForm/GuestBookingForm";

function Booking() {
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: hotel } = useQuery(
    "fetchHotelByID",
    async () => await apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  ); 

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!hotel) {
    // window.location.reload();
    return <></>;
  }
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-2">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        infantCount={search.infantCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser ? (
        <BookingForm
          hotel={hotel}
          currentUser={currentUser}
          hotelId={hotel._id}
          amount={(hotel.pricePerNight * numberOfNights* search.adultCount) + (hotel.pricePerNight * numberOfNights * search.childCount * 0.5)}
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          infantCount={search.infantCount}
          numberOfNights={numberOfNights}
          />
        ) : (
          <GuestBookingForm
          hotel={hotel}
          hotelId={hotel._id}
          amount={(hotel.pricePerNight * numberOfNights* search.adultCount) + (hotel.pricePerNight * numberOfNights * search.childCount * 0.5)}
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          infantCount={search.infantCount}
          numberOfNights={numberOfNights}
        />
      )}
    </div>
  );
}

export default Booking;
