import { FormEvent, useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
import { DestinationType } from "../../../backend/src/shared/types";
import { getDestinations } from "../api-client";
import { BiMinusCircle, BiPlusCircle, BiSearch } from "react-icons/bi";
import { BsCalendarFill, BsPersonFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

interface Props {
  handler: string;
}

const SearchBar = ({ handler }: Props) => {
  // const navigate = useNavigate();
  const search = useSearchContext();
  const isHomePage = handler === "HomePage";

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [infantCount, setInfantCount] = useState<number>(search.infantCount);
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchDestinations();
    document.addEventListener("click", handleDocumentClick); // Add event listener on mount
    return () => {
      document.removeEventListener("click", handleDocumentClick); // Remove event listener on unmount
    };
  }, []);

  useEffect(() => {
    setInputValue(destination);
  }, [destination]);

  const fetchDestinations = async () => {
    try {
      const data = await getDestinations();
      setDestinations(data);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };
  const getMonthName = (monthIndex: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };
  const inputWidth = `${Math.max(10, inputValue.length * 8)}px`;
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setShowPopup(true);
    setDestination(inputValue);

  };

  const handleDestinationClick = () => {
    setShowPopup(true);
  };

  const handleDestinationSelect = (selectedDestination: string) => {
    setDestination(selectedDestination);
    setShowPopup(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".popup-container")) {
      setShowPopup(false);
    }
    if (!target.closest(".guestSearchInput")) {
      setShowGuestPopup(false);
    }
    if (!target.closest(".dateSearchInput")) {
      setShowDatePopup(false);
    }
  };

  const handleReset = () => {
    setDestination("");
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
      childCount,
      infantCount
    );
    // navigate("/search");
    const formattedCheckIn = checkIn.toISOString().split('T')[0];
    const formattedCheckOut = checkOut.toISOString().split('T')[0];
    const url = `https://bookings.simplotel.com/?propertyId=9166&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&adults=${adultCount}&children=${childCount}&promocode=`;
    window.location.href = url;
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleCheckInChange = (date: Date | null) => {
    setCheckIn(date as Date);
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      const newCheckOut = checkOut < nextDay ? nextDay : checkOut;
      setCheckOut(newCheckOut);
    }
  };

  const handleCheckOutChange = (date: Date | null) => {
    setCheckOut(date as Date);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={
        isHomePage
          ? `p-1 h-fit bg-transparent border rounded-full flex items-center gap-2 portrait:hidden poppins-regular`
          : `p-1 h-fit bg-transparent border rounded-full flex items-center gap-2 portrait:hidden poppins-regular`
      }
      // className={
      //   isHomePage
      //     ?"-mt-14 p-3 bg-gray-100 rounded-full grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-4 items-center gap-2 shadow-2xl shadow-slate-400"
      //     : "-mt-4 p-3 bg-gray-100 rounded-full grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-4 items-center gap-2 shadow-2xl shadow-slate-400"
      // }
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <MdTravelExplore size={25} className="ml-2" />
      <div className="relative transition-all duration-500 min-w-32">
        <div className="flex flex-row items-center flex-1 min-w-full bg-transparent p-2">
          <input
            placeholder="Destination"
            className="text-md min-w-full focus:outline-none popup-container bg-transparent"
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleDestinationClick} style={{ width: inputWidth }} // Set dynamic width

          />
        </div>
        {showPopup && (
          <ul className="popup-container absolute top-full left-0 z-10 bg-white border border-gray-300 rounded-md mt-1 w-full">
            {destinations
              .filter((dest) =>
                dest.name.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((dest) => (
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
      <button
        className={`${inputValue ? `` : `hidden`}`}
        onClick={(e) => {
          e.preventDefault()
          setInputValue("");
          setDestination("");
        }}
      >
        <GrClose />
      </button>
      {/* <div className="h-10 w-0.5 bg-gray-300"></div> */}
      <div
        className="relative transition-all duration-500 w-auto dateSearchInput"
        onClick={() => {
          setShowDatePopup(true);
        }}
      >
        <label className="flex gap-2 items-center">
          <BsCalendarFill />
          {checkIn.getFullYear() === checkOut.getFullYear()
            ? `${checkIn.getMonth() === checkOut.getMonth()
              ? `${checkIn.getDate()}-${checkOut.getDate()} ${getMonthName(
                checkIn.getMonth()
              )}`
              : `${checkIn.getDate()} ${getMonthName(
                checkIn.getMonth()
              )} - ${checkOut.getDate()} ${getMonthName(
                checkOut.getMonth()
              )}`
            }`
            : `${checkIn.getDate()} ${getMonthName(
              checkIn.getMonth()
            )}, ${checkIn.getFullYear()} - ${checkOut.getDate()} ${getMonthName(
              checkOut.getMonth()
            )}, ${checkOut.getFullYear()}`}{" "}
        </label>
        {showDatePopup && (
          <div className="grid grid-cols-2 gap-2 dateSearchInput w-72 absolute top-10  bg-white p-2.5 rounded-lg shadow-2xl">
            <div>
              <div>
                <span className="text-sm ml-2">Check in:</span>
                <DatePicker
                  selected={checkIn}
                  onChange={handleCheckInChange}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={minDate}
                  maxDate={maxDate}
                  placeholderText="Check-in Date"
                  className="w-28 dateSearchInput rounded-full text-sm bg-white py-1.5 px-3 focus:outline-none border-2 border-gray-300"
                  wrapperClassName="w-28 dateSearchInput rounded-full text-sm"
                />
              </div>
            </div>
            <div>
              <span className="text-sm ml-2">Check Out:</span>
              <DatePicker
                selected={checkOut}
                onChange={handleCheckOutChange}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={
                  checkIn ? new Date(checkIn.getTime() + 86400000) : undefined
                }
                maxDate={maxDate}
                placeholderText="Check-out Date"
                className="w-28 dateSearchInput rounded-full text-sm bg-white py-1.5 px-3 focus:outline-none border-2 border-gray-300"
                wrapperClassName="w-28 dateSearchInput rounded-full text-sm"
              />
            </div>
          </div>
        )}
      </div>
      <div
        className="flex p-2.5 h-full w-32 bg-transparent relative guestSearchInput"
        onClick={() => {
          setShowGuestPopup(true);
        }}
      >
        <label className="items-center w-full flex gap-2 text-nowrap">
          <BsPersonFill />
          {childCount+adultCount+infantCount} {`Guest${childCount+adultCount+infantCount == 1 ? "" : "s"}`}
        </label>
        {showGuestPopup && (
          <div className="flex p-2.5 w-max flex-col gap-2 shadow-2xl rounded-md bg-white absolute top-full right-0 guestSearchPopup">
            <div className="items-center gap-2 grid grid-cols-3 text-left">
            <span className=" col-span-2"><span className="text-sm poppins-medium"> Adults: </span> <span className="text-xs  text-gray-600">Ages 13 or above</span></span>
              <div className="grid grid-cols-3 text-center place-items-center  gap-2">
                <button className={`text-xl text-center ${adultCount === 0 && `text-gray-500`}`} disabled={adultCount === 0} onClick={(event: FormEvent) => {
                  event.preventDefault(); setAdultCount(adultCount - 1); search.saveSearchValues(
                    destination,
                    checkIn,
                    checkOut,
                    adultCount,
                    childCount,
                    infantCount
                  );
                }}><BiMinusCircle /></button>
                <span>{adultCount}</span>
                <button className=" text-xl text-center" onClick={(event: FormEvent) => {
                  event.preventDefault(); setAdultCount(adultCount + 1); search.saveSearchValues(
                    destination,
                    checkIn,
                    checkOut,
                    adultCount,
                    childCount,
                    infantCount
                  );
                }}><BiPlusCircle /></button>
              </div>
            </div>
            <div className="items-center gap-2 grid grid-cols-3 text-left">
            <span className=" col-span-2">  <span className="text-sm poppins-medium">Children: </span> <span className="text-xs  text-gray-600">Ages 0-12</span></span>
              <div className="grid grid-cols-3 text-center place-items-center  gap-2">
                <button className={`text-xl text-center ${childCount === 0 && `text-gray-500`}`} disabled={childCount === 0} onClick={(event: FormEvent) => {
                  event.preventDefault(); setChildCount(childCount - 1); search.saveSearchValues(
                    destination,
                    checkIn,
                    checkOut,
                    adultCount,
                    childCount,
                    infantCount
                  );
                }}><BiMinusCircle /></button>
                <span>{childCount}</span>
                <button className=" text-xl text-center" onClick={(event: FormEvent) => {
                  event.preventDefault(); setChildCount(childCount + 1); search.saveSearchValues(
                    destination,
                    checkIn,
                    checkOut,
                    adultCount,
                    childCount,
                    infantCount
                  );
                }}><BiPlusCircle /></button>
              </div>
            </div>
            <div className="items-center gap-2 grid-cols-3 text-left hidden">
            <span className=" col-span-2">  <span className="text-sm poppins-medium">Infant: </span> <span className="text-xs  text-gray-600">Under 4</span></span>
              <div className="grid grid-cols-3 text-center place-items-center gap-2">
                <button className={`text-xl text-center ${infantCount === 0 && `text-gray-500`}`} disabled={infantCount === 0} onClick={(event: FormEvent) => {
                  event.preventDefault(); setInfantCount(infantCount - 1); search.saveSearchValues(
                    destination,
                    checkIn,
                    checkOut,
                    adultCount,
                    childCount,
                    infantCount
                  );
                }}><BiMinusCircle /></button>
                <span>{infantCount}</span>
                <button className=" text-xl text-center" onClick={(event: FormEvent) => {
                  event.preventDefault(); setInfantCount(infantCount + 1); search.saveSearchValues(
                    destination,
                    checkIn,
                    checkOut,
                    adultCount,
                    childCount,
                    infantCount
                  );
                }}><BiPlusCircle /></button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button className="w-fit bg-yogvan text-white h-full p-2 m-1 font-bold text-xl  rounded-full">
          <BiSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
