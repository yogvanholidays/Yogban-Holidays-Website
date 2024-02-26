/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import { DestinationType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

const SearchAndDeleteDestinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getDestinations();
      setDestinations(data);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.deleteDestination(id);
      // Remove the deleted destination from the list
      setDestinations(
        destinations.filter((destination) => destination._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete destination:", error);
    }
  };

  const filteredDestinations = destinations.filter((destination) => {
    const { name } = destination;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return name.toLowerCase().includes(lowerSearchTerm);
  });

  return (
    <div>
      <h2 className="font-bold text-3xl">Destiations</h2>
      <div className="flex 2xl:flex-nowrap portrait:flex-wrap my-2 gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          className="border p-2 rounded-md h-full w-full"
        />
        <Link
          to="/upload-destination"
          className="p-2 rounded-md bg-black text-white min-w-fit"
        >
          Add Destination
        </Link>
        </div>
      {loading && <p>Loading...</p>}
      <div className="flex flex-wrap">
        {filteredDestinations.map((destination) => (
          <div
            key={destination._id}
            className="m-2 border rounded-md p-2 flex w-min text-center items-center"
          >
            <span className="font-bold text-xl m-2">{destination.name}</span>
            <button
              onClick={() => handleDelete(destination._id)}
              className="p-2 ml-24 rounded-md bg-red-400 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndDeleteDestinations;
