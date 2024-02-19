import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import ArrivingToday from "../components/ArrivingToday";
import AdminControls from "../components/AdminControls";
import ReactPaginate from "react-paginate";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const hotelsPerPage = 5;
  const offset = currentPage * hotelsPerPage;

  const pageCount = Math.ceil((hotelData?.length || 0) / hotelsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const filteredHotels = hotelData?.filter((hotel) =>
  hotel.name.toLowerCase().includes(searchQuery.toLowerCase())||
  hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
  hotel.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
  hotel.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
  hotel._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentHotels = filteredHotels?.slice(offset, offset + hotelsPerPage);

  return (
    <div className="space-y-5">
      <AdminControls />
      <ArrivingToday />
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-2/6"
          placeholder="Search by hotel name or city or id"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </span>
      <div className="grid grid-cols-1 gap-8">
        {currentHotels?.map((hotel) => (
          <div
            key={hotel.name}
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="flex gap-2 flex-wrap">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center flex-grow">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center flex-grow">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center flex-grow">
                <BiMoney className="mr-1" />₹{hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center flex-grow">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center flex-grow">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-red-600 text-white text-xl font-bold p-2 hover:bg-red-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 ">
      <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex items-center space-x-4 text-red-600"}
          activeClassName={"active"}
          previousClassName={"px-3 py-1 border border-gray-950 rounded"}
          nextClassName={"px-3 py-1 border border-gray-950 rounded"}
          breakClassName={"px-3 py-1 border border-gray-950 rounded"}
          pageClassName={"px-3 py-1 bg-red-100 rounded"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          disabledClassName={"text-gray-500 pointer-events-none"}
        />
      </div>
    </div>
  );
};

export default MyHotels;
