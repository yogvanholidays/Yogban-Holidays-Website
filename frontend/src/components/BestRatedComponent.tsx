/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BestRated from "./BestRated";
// import { Link } from "react-router-dom";
import {
  isMobile,
} from "react-device-detect";
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
  const hotels = hotelList?.bestRatedHotels
  const topRowHotels = isMobile? hotels?.slice(0, 2) || []
  :hotels?.slice(0, 3) || [];

  const bottomRowHotels = isMobile
    ? hotels?.slice(2, 4) || []
    : hotels?.slice(2, 5) || [];

  if (!Array.isArray(topRowHotels) || !Array.isArray(bottomRowHotels)) {
    return <></>
  }

  return (

    <div className="space-y-1 mb-6 landscape:-mt-10 portrait:-mt-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold poppins-semibold">Best Rated</h2>
          <p>Best rated accommodations</p>
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
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2.5">
          {topRowHotels.map((hotel) => (
            <BestRated hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2.5">
          {bottomRowHotels.map((hotel) => (
            <BestRated hotel={hotel} />
          ))}
          
        </div>
        {isMobile ? (
          <span
          onClick={handleSelectNowClick}
          className="block w-full text-center bg-yogvan hover:bg-yogvan-dark text-white py-3 rounded-md"
          >
            Select Now
          </span>
          // <Link
          //   to={`/search`}
          //   className="block w-full text-center bg-yogvan hover:bg-yogvan-dark text-white py-3 rounded-md"
          // >
          //   Select Now
          // </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
