import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { Carousel } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";

const Detail = () => {
  const { hotelId } = useParams();

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
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div>
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
