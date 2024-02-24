import { FormEvent, useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { DestinationType } from "../../../backend/src/shared/types";
import { getDestinations } from "../api-client";
interface Props{
  handler:string;
}


const SearchBar = ({handler}: Props) => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const isHomePage = handler === "HomePage";

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const data = await getDestinations();
      setDestinations(data);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  const handleDestinationClick = () => {
    setShowPopup(true);
  };

  const handleDestinationSelect = (selectedDestination: string) => {
    setDestination(selectedDestination);
    setShowPopup(false);
  };

  const handleReset = () => {
    setDestination('');
    setCheckIn(new Date());
    setCheckOut(new Date(new Date().getTime() + 86400000));
    setAdultCount(1);
    setChildCount(0);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  // Function to handle change in check-in date
  const handleCheckInChange = (date: Date | null) => {
    setCheckIn(date as Date);
    // Automatically set the check-out date to one day after check-in date
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay);
    }
  };
  const handleCheckOutChange = (date: Date | null) => {
    setCheckOut(date as Date);
  };
  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}

      className={isHomePage ? "-mt-14 p-3 bg-gray-100 rounded-md grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 shadow-2xl shadow-slate-400":
      "-mt-8 p-3 bg-gray-100 rounded-md grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 shadow-2xl shadow-slate-400"
    } 
    style={{transition: "all 0.3s ease-in-out"}}
    >
      <div className="relative w-full">
        <div className="flex flex-row items-center flex-1 w-full bg-white p-3 rounded border-2 border-gray-300">
        <MdTravelExplore size={25} className="mr-2" />
          <input
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-none"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            onClick={handleDestinationClick}
          />
        </div>
        {showPopup && (
          <ul className="absolute top-full left-0 z-10 bg-white border border-gray-300 rounded-md mt-1 w-full">
            {destinations.map((dest) => (
              <li
                key={dest.name}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleDestinationSelect(dest.name)}
              >
                {dest.name}
              </li>
            ))}
          </ul>
        )}
      </div>



      

      <div className="flex bg-white p-2.5 gap-2 rounded border-2 h-full border-gray-300 ">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={handleCheckInChange}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-3 focus:outline-none rounded border-2 border-gray-300"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={handleCheckOutChange}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : undefined}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-3 focus:outline-none rounded border-2 border-gray-300"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-3">
        <button className="w-2/3 bg-blue-600 text-white h-full p-3 font-bold text-xl hover:bg-blue-500 rounded-lg">
          Search
        </button>
        <button type="reset" className="w-1/3 bg-red-600 text-white h-full p-3 font-bold text-xl hover:bg-red-500 rounded-lg">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
