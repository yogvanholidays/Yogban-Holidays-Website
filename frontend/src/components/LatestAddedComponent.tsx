/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "./LastestDestinationCard";
// import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useState } from "react";

const Home = () => {
  const [checkIn,] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, ] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkOut") || new Date(new Date().getTime() + 86400000).toISOString())
  );
  const [adultCount, ] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, ] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "0")
  );
  
  const handleSelectNowClick = (event: any) => {
    event.preventDefault();
    const formattedCheckIn = checkIn.toISOString().split('T')[0];
    const formattedCheckOut = checkOut.toISOString().split('T')[0];
    const url = `https://bookings.yogvanholidayapartments.com/?propertyId=9166&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&adults=${adultCount}&children=${childCount}&promocode=&triggerSearch=true`;
    window.location.href = url;
  };

  const { data: hotelList } = useQuery("fetchQuery", () => apiClient.Latest());
  const hotels = hotelList?.latestHotels;

  const topRowHotels = isMobile
    ? hotels?.slice(0, 4) || []
    : hotels?.slice(0, 5) || [];

  if (!Array.isArray(topRowHotels) || !Array.isArray(hotels)) {
    return <></>
  }
  return (
    <section className="space-y-3 mb-6">
      <div className="flex justify-between items-center">
        <div>

          <h2 className="text-3xl font-bold poppins-semibold">Most Booked</h2>
          <p>Most booked accommodations</p>


        </div>
        <div className=" portrait:hidden">
          {/* <Link
            to={`/search`}
            className="relative cursor-pointer overflow-hidden rounded-md"
          >
            <div className=" px-4 py-2 rounded-lg bg-yogvan hover:bg-yogvan-dark text-white flex items-center text-center justify-center content-center" style={{}}>
              <span className="font font-medium text-xl">Select Now</span>
            </div>
          </Link> */}
          <span 
  onClick={handleSelectNowClick}
className="relative cursor-pointer overflow-hidden rounded-md"
          >
            <div className=" px-4 py-2 rounded-lg bg-yogvan hover:bg-yogvan-dark text-white flex items-center text-center justify-center content-center" style={{}}>
              <span className="font font-medium text-xl">Select Now</span>
            </div>
          </span>
        </div>
      </div>

      <div className="grid gap-2.5">

        <div className="grid md:grid-cols-5 grid-cols-2 gap-2.5">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        {isMobile ? (
          <span
          onClick={handleSelectNowClick}
          className="block w-full text-center bg-yogvan hover:bg-yogvan-dark text-white py-3 rounded-md"
          >
            Select Now
          </span>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Home;
