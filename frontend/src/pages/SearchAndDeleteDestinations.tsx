import React, { useState, useEffect } from "react";
import * as apiClient from '../api-client';

const SearchAndDeleteDestinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchDestinations();
  }, []);

  const searchDestinations = async () => {
    setLoading(true);
    try {
      const data = await apiClient.searchDestinations(searchTerm);
      setDestinations(data);
    } catch (error) {
      console.error("Failed to search destinations:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.deleteDestination(id);
      // Remove the deleted destination from the list
      setDestinations(destinations.filter(destination => destination._id !== id));
    } catch (error) {
      console.error("Failed to delete destination:", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Destinations</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name..."
        className="border p-2 rounded-md m-2"
      />
      <button onClick={searchDestinations} className="p-2 rounded-md bg-red-400 text-white">Search</button>
      {loading && <p>Loading...</p>}
      <div className="flex flex-col flex-wrap">
        {destinations.map(destination => (
          <div key={destination._id} className="m-2 border rounded-md p-2 flex w-min text-center items-center">
            <span className="font-bold text-xl m-2">{destination.name}</span>
            <button onClick={() => handleDelete(destination._id)} className="p-2 ml-24 rounded-md bg-red-400 text-white">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndDeleteDestinations;
