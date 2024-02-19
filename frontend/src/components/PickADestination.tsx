import React, { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import * as apiClient from '../api-client';

function PickADestination() {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const data = await apiClient.getDestinations();
      setDestinations(data);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };
  if(!destinations){
    return <></>
  }

  const handleButtonClick = (place) => {
    navigate("/search");
    search.saveSearchValues(
      place,
      search.checkIn,
      search.checkOut,
      search.adultCount,
      search.childCount
    );
  };

  return (
    <div className="space-y-3 mb-12">
      <h1 className="font-bold text-3xl">Pick A Destination</h1>
      <div className="flex flex-wrap gap-x-20">
        {destinations.map((destination, index) => (
          <button
            key={index}
            className="flex flex-col text-center content-end items-center"
            style={{ height: "6rem", width: "4rem" }}
            onClick={() => handleButtonClick(destination.name)}
          >
            <img src={destination.illustrationImageUrl} alt={destination.name} />
            <span className="font-semibold text-base">{destination.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PickADestination;
