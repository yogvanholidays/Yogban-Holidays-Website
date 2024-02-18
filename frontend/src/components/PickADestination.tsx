import React from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import Bhimtal from "../assets/locationIcons/Bhimtal.svg";
import Conoor from "../assets/locationIcons/Conoor.svg";
import Gurgaon from "../assets/locationIcons/Gurgaon.svg";
import Lonavala from "../assets/locationIcons/Lonavala.svg";
import Mussoorie from "../assets/locationIcons/Mussoorie.svg";
function PickADestination() {
  const navigate = useNavigate();
  const search = useSearchContext();

  const handleButtonClick = (place: string) => {
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
        <button
          className="flex flex-col text-center content-end items-center"
          style={{ height: "6rem", width: "4rem" }}
          onClick={() => handleButtonClick("Himachal")}
        >
          <img src={Bhimtal} />
          <span className="font-semibold text-base">Himachal</span>
        </button>
        <button
          className="flex flex-col text-center content-end items-center"
          style={{ height: "6rem", width: "4rem" }} onClick={() => handleButtonClick("Conoor")}
        >
          <img src={Conoor} />
          <span className="font-semibold text-base">Conoor</span>
        </button>
        <button
          className="flex flex-col text-center content-end items-center"
          style={{ height: "6rem", width: "4rem" }}  onClick={() => handleButtonClick("Kolkata")}
        >
          <img src={Gurgaon} />
          <span className="font-semibold text-base">Kolkata</span>
        </button>
        <button
          className="flex flex-col text-center content-end items-center"
          style={{ height: "6rem", width: "4rem" }}  onClick={() => handleButtonClick("Mumbai")}
        >
          <img src={Lonavala} />
          <span className="font-semibold text-base">Mumbai</span>
        </button>
        <button
          className="flex flex-col text-center content-end items-center"
          style={{ height: "6rem", width: "4rem" }}  onClick={() => handleButtonClick("Rishikesh")}
        >
          <img src={Mussoorie} />
          <span className="font-semibold text-base">Rishikesh</span>
        </button>
        <button
          className="flex flex-col text-center content-end items-center"
          style={{ height: "6rem", width: "4rem" }}  onClick={() => handleButtonClick("Bhimtal")}
        >
          <img src={Bhimtal} />
          <span className="font-semibold text-base">Bhimtal</span>
        </button>
      </div>
    </div>
  );
}

export default PickADestination;
