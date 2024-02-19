/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import * as apiClient from '../api-client';
import { HotelType } from "../../../backend/src/shared/types";

const SearchAndDeleteHotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SearchHotels();
  }, []);

  const SearchHotels = async () => {
    setLoading(true);
    try {
      const data = await apiClient.searchHotelsToDelete(searchTerm);
      setHotels(data);
    } catch (error) {
      console.error("Failed to search hotels:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: any) => {
    try {
      await apiClient.deleteHotel(id);
      // Remove the deleted hotel from the list
      setHotels(hotels.filter(hotel => hotel._id !== id));
    } catch (error) {
      console.error("Failed to delete Hotel:", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Hotels</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name..."
        className="border p-2 rounded-md m-2"
      />
      <button onClick={SearchHotels} className="p-2 rounded-md bg-red-400 text-white">Search</button>
      {loading && <p>Loading...</p>}
      <div className="flex flex-wrap">
        {hotels.map(hotel => (
          <div key={hotel._id} className="m-2 border rounded-md p-2 flex flex-col w-min justify-end"  style={{width:"256px"}}>
            <span className="font-bold text-xl m-2">{hotel.name}</span>
            <span className="font-bold text-sm m-2">{hotel.city}, {hotel.country}</span>
            <button onClick={() => handleDelete(hotel._id)} className="p-2 rounded-md bg-red-400 text-white" style={{width:"100%"}}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndDeleteHotels;
