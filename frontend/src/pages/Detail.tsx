/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { Carousel } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";

const Detail = () => {
  const { hotelId } = useParams();
  const [filter, setFilter] = useState("all"); // Initialize filter state

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }
  let randomReviews = null;
  if (hotel.reviews) {
    // Shuffle the reviews array
    randomReviews = hotel.reviews.sort((a: any, b: any) => b.rating - a.rating);
  }
  const filteredReviews =
    filter === "all"
      ? randomReviews // Display all reviews if filter is set to "all"
      : randomReviews.filter((review: any) => review.platform === filter); // Filter reviews by selected platform
  return (
    <div className="space-y-6 rounded-md p-6 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Link to="/search" className="text-blue-500">
          <IoArrowBack className="text-lg" />
        </Link>
        <span className="flex">
          {[...Array(hotel.starRating)].map((_, index) => (
            <AiFillStar key={index} className="fill-yellow-400" />
          ))}
        </span>
      </div>
      <h1 className="text-3xl font-bold">{hotel.name}</h1>

      <Carousel>
        {hotel.imageUrls.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="rounded-md w-full h-auto object-cover object-center"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility, index) => (
          <div key={index} className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="whitespace-pre-line">
          <span className=" text-wrap max-w-20">{hotel.description}</span>
        </div>
        <div>
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>

      <div className="space-y-4">
        {hotel.reviews && (
          <div>
            <h2 className="text-xl font-bold">Reviews</h2>

            <div className="flex space-x-2 portrait:text-xs overflow-x-scroll">
              <button
                onClick={() => setFilter("all")}
                className={`py-2 px-3 rounded-md min-w-fit scroll-smooth  ${
                  filter === "all"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 border-2 text-gray-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("Google")}
                className={`py-2 px-3 rounded-md min-w-fit scroll-smooth  ${
                  filter === "Google"
                    ? "bg-gray-800 text-white flex items-center gap-2"
                    : "bg-gray-100 border-2 text-gray-800 flex items-center gap-1"
                }`}
              >
                <img src="/Google.svg" alt="google maps" className="h-6" />
                <span>Google</span>
              </button>
              <button
                onClick={() => setFilter("airbnb")}
                className={`py-2 px-3 rounded-md min-w-fit scroll-smooth  ${
                  filter === "airbnb"
                    ? "bg-gray-800 text-white  flex items-center gap-2"
                    : "bg-gray-100 border-2 text-gray-800 flex items-center gap-2"
                }`}
              >
                <img src="/airbnb.svg" alt="airbnb" className="h-6" />
                <span>Airbnb</span>
              </button>
              <button
                onClick={() => setFilter("makemytrip")}
                className={`py-2 px-3 rounded-md min-w-fit scroll-smooth  ${
                  filter === "makemytrip"
                    ? "bg-gray-800 text-white flex items-center gap-2"
                    : "bg-gray-100 border-2 text-gray-800 flex items-center gap-2"
                }`}
              >
                <img src="/makemytrip.svg" alt="make my trip" className="h-6" />
                <span>MakeMyTrip</span>
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-4 overflow-x-scroll scroll-smooth">
          {filteredReviews &&
            filteredReviews.map((review: any, index: any) => (
              <div
                key={index}
                className="flex flex-col border border-gray-200 p-4 rounded-md hover:shadow-lg"
                style={{ minWidth: "300px", maxWidth: "300px" }} // Set a minimum width for each review card
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Font_Awesome_5_solid_user-circle.svg"
                      alt="user"
                      className="h-7"
                    />
                    <div>
                      <p className="text-lg">{review.name}</p>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, index) => (
                          <AiFillStar key={index} className="fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src={
                        `/${review.platform}.svg` || `/${review.platform}.png`
                      }
                      alt={`${review.platform}`}
                      className="h-7"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs">{review.review}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
