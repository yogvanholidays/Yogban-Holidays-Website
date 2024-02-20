/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import * as apiClient from '../api-client';
import { HotelType } from "../../../backend/src/shared/types";
import { hotelFacilities, hotelTypes } from "../config/hotel-options-config";


const SearchAndDeleteHotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchHotels();
  }, [searchTerm, selectedType, selectedFacilities]);

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

  return (
    <div>
      <h2 className="font-bold text-2xl">Properties</h2>
      <div className="flex">
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
      </div>
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
      <button onClick={searchHotels} className="p-2 rounded-md bg-red-400 text-white">Search</button>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-3 gap-3 portrait:grid-cols-1">
        {hotels.map(hotel => (
          <div key={hotel._id} className="border rounded-md p-2 flex flex-col justify-end w-full">
            <span className="font-bold text-xl m-2">{hotel.name}</span>
            <span className="font-bold text-sm m-2">{hotel.city}, {hotel.country}</span>
            <button onClick={() => handleDelete(hotel._id)} className="p-2 rounded-md bg-red-400 text-white" style={{ width: "100%" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndDeleteHotels;