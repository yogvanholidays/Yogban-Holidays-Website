/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import * as apiClient from '../api-client';
import { HotelType } from "../../../backend/src/shared/types";
import { hotelFacilities, hotelTypes } from "../config/hotel-options-config";
import { Link } from "react-router-dom";

const SearchAndDeleteHotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    searchHotels();
  }, [searchTerm, selectedType, selectedFacilities, currentPage]);

  const searchHotels = async () => {
    setLoading(true);
    try {
      // You can use your backend API for searching if needed
      const data = await apiClient.fetchMyHotels();
      const filteredHotels = data.filter(hotel => {
        const matchesSearchTerm = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === "All" || hotel.type === selectedType;
        const matchesFacilities = selectedFacilities.every(facility => hotel.facilities.includes(facility));
        return matchesSearchTerm && matchesType && matchesFacilities;
      });
      setHotels(filteredHotels);
    } catch (error) {
      console.error("Failed to search hotels:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: any) => {
    try {
      await apiClient.deleteHotel(id);
      setHotels(hotels.filter(hotel => hotel._id !== id));
    } catch (error) {
      console.error("Failed to delete Hotel:", error);
    }
  };

  const handleFacilityChange = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  // Pagination
  const hotelsPerPage = 12;
  const offset = currentPage * hotelsPerPage;
  const pageCount = Math.ceil(hotels.length / hotelsPerPage);
  const paginatedHotels = hotels.slice(offset, offset + hotelsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl">All Properties</h2>
      <Link to='/' className="p-2 rounded-md bg-red-400 text-white h-full min-w-fit"> Add New</Link>
      </div>
      <div className="flex portrait:flex-col">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          className="border p-2 rounded-md m-2"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border p-2 rounded-md m-2"
        >
          <option value="All">All Types</option>
          {hotelTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      <div className="flex flex-wrap">
        {hotelFacilities.map(facility => (
          <div key={facility} className="m-2">
            <input
              type="checkbox"
              id={facility}
              checked={selectedFacilities.includes(facility)}
              onChange={() => handleFacilityChange(facility)}
              className="mr-2"
            />
            <label htmlFor={facility}>{facility}</label>
          </div>
        ))}
      </div>
      </div>
      <button onClick={searchHotels} className="p-2 rounded-md bg-red-400 text-white">Refresh Now</button>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-3 gap-3 portrait:grid-cols-1">
        {paginatedHotels.map(hotel => (
          <div key={hotel._id} className="border rounded-md p-2 flex flex-col justify-end w-full">
            <Link className="font-bold text-xl m-2" to={`/edit-hotel/${hotel._id}`}>{hotel.name}</Link>
            <span className="font-bold text-sm m-2">{hotel.city}, {hotel.country}</span>
            <button onClick={() => handleDelete(hotel._id)} className="p-2 rounded-md bg-red-400 text-white" style={{ width: "100%" }}>Delete</button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-4">
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

export default SearchAndDeleteHotels;
