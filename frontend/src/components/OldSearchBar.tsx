import { FormEvent, useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { DestinationType } from "../../../backend/src/shared/types";
import { getDestinations } from "../api-client";
import { GrClose } from "react-icons/gr";
import { BiMinusCircle, BiPlusCircle, BiSearch } from "react-icons/bi";
import { isMobile } from "react-device-detect";
import { motion } from 'framer-motion';
// import { LuArrowDown } from "react-icons/lu";

interface Props {
  handler: string;
}

const SearchBar = ({ handler }: Props) => {
  const navigate = useNavigate();
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
  const [showGuestPop, setShowGuestPop] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isGuestExpanded, setIsGuestExpanded] = useState(false);
  const [isBookingEngineShown, setIsBookingEngineShown] = useState(false);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setDestination(inputValue);
    setShowPopup(true);
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
    if (!target.closest(".guestpop")) {
      setShowGuestPop(false);
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
    setIsBookingEngineShown(false)
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      infantCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleCheckInChange = (date: Date | null) => {
    setCheckIn(date as Date);
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay);
    }
  };

  const handleCheckOutChange = (date: Date | null) => {
    setCheckOut(date as Date);
  };


  // const containerVariants = {
  //   expanded: {
  //     height: "auto",
  //     opacity: 1,
  //     transition: {
  //       type: "tween",
  //       duration: 0.5,
  //       ease: "easeInOut"
  //     }
  //   },
  //   collapsed: {
  //     height: 0,
  //     opacity: 0,
  //     transition: {
  //       type: "tween",
  //       duration: 0.5,
  //       ease: "easeInOut"
  //     }
  //   }
  // };

  const buttonVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2 } },
    tap: { scale: 0.8 },
  };


  // const arrowVariants = {
  //   expanded: {
  //     rotate: 180, // 90 degrees left
  //     transition: {
  //       type: "tween",
  //       duration: 0.5,
  //       ease: "easeInOut",
  //     },
  //   },
  //   collapsed: {
  //     rotate: 0, // Default position
  //     transition: {
  //       type: "tween",
  //       duration: 0.5,
  //       ease: "easeInOut",
  //     },
  //   },
  // };



  return (<div>
    <motion.div onClick={()=>setIsBookingEngineShown(true)} className={`${isHomePage?``:`mt-[4.5rem]`} flex landscape:hidden gap-3 items-center px-4 py-2 h-auto -mt-6 bg-white rounded-full w-full  shadow-xl shadow-slate-300`}>
      <BiSearch className="text-2xl"/>
      <div className="flex flex-col poppins-regular">
        <span className="font-bold ">
          Where to?</span>
          <span className="text-xs">
            Destination | Select Dates | Add Guests
          </span>
      </div>
    </motion.div>

    {isBookingEngineShown && <div className="landscape:hidden  fixed px-1 left-0 right-0 bottom-0 top-0 overflow-y-scroll w-full bg-clip-padding backdrop-filter backdrop-blur-sm  bg-white z-[999999999999999999]">
        <div className="p-1 flex justify-end mr-6 mt-[5.5rem]" onClick={()=>setIsBookingEngineShown(false)}>
          <div className="outline rounded-full p-1">
          <GrClose/>
          </div>
          </div>
        
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={ // ? "-mt-32 p-3 bg-gray-100 rounded-md grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 "// landscape:shadow-none" //remove last part to revert searchbar positioning
          ` poppins-regular ${isMobile ? `p-3 -m-2` : `p-3 gap-2`} bg-white grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-5 items-center gap-0` // landscape:shadow-none` //remove last part to revert searchbar positioning
         
      }
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <div className="relative w-full">
        <div className=" portrait:hidden flex flex-row items-center flex-1 w-full bg-white p-3 rounded border-2 border-gray-300 ">
          <MdTravelExplore size={25} className="mr-2" />
          <input
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-none popup-container"
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleDestinationClick}
          />
          <button
            className={`${inputValue ? `` : `hidden`}`}
            onClick={(e) => {
              e.preventDefault();
              setInputValue("");
              setDestination("");
            }}
          >
            <GrClose />
          </button>
        </div>

        <div className=" landscape:hidden mb-2 p-2.5 bg-white rounded-2xl shadow-sm ">
          <h1 className="text-xl ml-2 font-bold poppins-semibold mb-2">Where are you going?</h1>
          <div className="flex flex-row items-center flex-1 w-full bg-white p-3 rounded-xl border-2 border-gray-300 ">
            <MdTravelExplore size={25} className="mr-2" />
            <input
              placeholder="Type... Rishikesh"
              className="text-md w-full focus:outline-none popup-container"
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleDestinationClick}
            />
            <button
              className={`${inputValue ? `` : `hidden`}`}
              onClick={(e) => {
                e.preventDefault();
                setInputValue("");
                setDestination("");
              }}
            >
              <GrClose />
            </button>
          </div>
        </div>
        {showPopup && (
          <div className={`popup-container absolute ${`landscape:top-full landscape:w-full portrait:top-24 portrait:w-full`} left-0 z-10 px-2.5`}>

            <ul className={` bg-white border border-gray-300 rounded-md ${!isMobile ? `` : `shadow`} `}>
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
          </div>
        )}
      </div>

      <>
        <div className="portrait:hidden">
          <DatePicker
            selected={checkIn}
            onChange={handleCheckInChange}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className=" xl:w-full w-full bg-white p-3 focus:outline-none rounded border-2 border-gray-300"
            wrapperClassName=" xl:w-full w-full"
            dateFormat={`dd/MM/yyyy`}
          />
        </div>
        <div className="portrait:hidden">
          <DatePicker
            selected={checkOut}
            onChange={handleCheckOutChange}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : undefined}
            maxDate={maxDate}
            placeholderText="Check-out Date"
            className=" xl:w-full w-full bg-white p-3 focus:outline-none rounded border-2 border-gray-300"
            wrapperClassName=" xl:w-full w-full"
            dateFormat={`dd/MM/yyyy`}
          />
        </div>
      </>


      <div className=" landscape:hidden my-2 p-2.5 bg-white rounded-2xl shadow-sm ">
        <h1 className="text-2xl ml-2 font-bold poppins-semibold mb-2">When</h1>
        <div className="grid grid-cols-2 gap-2">
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
              className="xl:w-full w-full bg-white p-3 focus:outline-none rounded-xl text-center border-2 border-gray-300"
              wrapperClassName="xl:w-full w-full"
              dateFormat={`dd/MM/yyyy`}
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
              className=" xl:w-full w-full bg-white p-3 focus:outline-none rounded-xl text-center border-2 border-gray-300"
              wrapperClassName=" xl:w-full w-full"
              dateFormat={`dd/MM/yyyy`}
            />
          </div>
        </div>
      </div>




      <div className=" portrait:hidden grid grid-cols-1 bg-white p-2.5 gap-3 rounded border-2 h-full border-gray-300 relative guestpop" onClick={() => setShowGuestPop(true)}>
        <div className="items-center flex justify-between mx-3">
          No. of Guests:
          <div className="flex gap-3 font-bold">
            {adultCount + childCount + infantCount}

          </div>
        </div>
        {showGuestPop && <div className="grid grid-cols-1 text-sm top-full h-max bg-white p-2.5 gap-3 rounded border-2 -bottom-28 w-max border-gray-300 absolute guestpop">
          <div className="items-center gap-2 grid grid-cols-3 text-left ">
            <span className=" col-span-2"><span className="text-sm"> Adults: </span> <span className="text-xs  text-gray-500">Ages 13 or above</span></span>
            <div className="grid grid-cols-3 text-center place-items-center gap-2">
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
              {adultCount}
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
          <div className="items-center gap-2 grid grid-cols-3 text-left ">
            <span className=" col-span-2">  <span className="text-sm">Children: </span> <span className="text-xs  text-gray-500">Ages 4-12</span></span>
            <div className="grid grid-cols-3 text-center place-items-center gap-2">
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
              {childCount}
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


          <div className="items-center gap-2 grid grid-cols-3 text-left ">
            <span className=" col-span-2">  <span className="text-sm">Infant: </span> <span className="text-xs  text-gray-500">Under 4</span></span>
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
              {infantCount}
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
        </div>}
      </div>


      <div className="landscape:hidden my-2 mb-3 p-2.5 bg-white rounded-2xl shadow-sm">
        <div className="flex justify-between items-center"
          onClick={() => setIsGuestExpanded(!isGuestExpanded)}
        >

          <h1
            className="text-2xl ml-2 font-bold poppins-semibold"
          >
            Who's Coming
          </h1>
          {/* <LuArrowDown /> */}
        {/* <motion.div
          variants={arrowVariants}
          initial={isGuestExpanded ? "collapsed" : "expanded"}
          animate={isGuestExpanded ? "expanded" : "collapsed"}
        >
          <LuArrowDown />
        </motion.div> */}
        </div>


        {/* <motion.div
          className="overflow-hidden"
          initial={isGuestExpanded ? "collapsed" : "expanded"}
          animate={isGuestExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
        > */}
          <ul className="mx-2">
            {[
              { label: "Adults", ageRange: "Ages 13 and above", count: adultCount, setCount: setAdultCount },
              { label: "Children", ageRange: "Ages 4-12", count: childCount, setCount: setChildCount },
              { label: "Infants", ageRange: "Under 4", count: infantCount, setCount: setInfantCount },
            ].map((item, index) => (
              <li key={index} className="items-center flex justify-between border-b last:border-b-0 py-3">
                <span className="flex flex-col">
                  <span className="text-lg poppins-medium">{item.label}</span>
                  <span className="text-xs text-gray-600 poppins-regular">{item.ageRange}</span>
                </span>
                <div className="grid grid-cols-3 text-center place-items-center gap-2">
                  <motion.button
                    className={`text-xl text-center ${item.count === 0 ? "text-gray-500" : ""}`}
                    disabled={item.count === 0}
                    onClick={(event: FormEvent) => {
                      event.preventDefault();
                      item.setCount(item.count - 1);
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <BiMinusCircle />
                  </motion.button>
                  {item.count}
                  <motion.button
                    className="text-xl text-center"
                    onClick={(event: FormEvent) => {
                      event.preventDefault();
                      item.setCount(item.count + 1);
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <BiPlusCircle />
                  </motion.button>
                </div>
              </li>
            ))}
          </ul>
        {/* </motion.div> */}
      </div>



      <div>
        <button className={`w-full bg-yogvan text-white h-full p-3 poppins-medium text-xl ${!isMobile ? `rounded-lg` : `rounded-xl`}`}>
          Search
        </button>
        <button
          type="reset"
          className="w-1/3 hidden bg-transparent text-gray-500 h-full p-3 poppins-regular text-xl hover:bg-red-500 rounded-lg"
        >
          X
        </button>
      </div>
    </form>
    </div>}



    <div className=" portrait:hidden">
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={
        isHomePage
          ? // ? "-mt-32 p-3 bg-gray-100 rounded-md grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 "// landscape:shadow-none" //remove last part to revert searchbar positioning
          `-mt-14 poppins-regular ${isMobile ? `p-3 -m-2` : `p-3 gap-2`} bg-gray-100 rounded-2xl grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-5 items-center  gap-2 shadow-2xl shadow-slate-400` // landscape:shadow-none` //remove last part to revert searchbar positioning
          : `mt-16 poppins-regular p-3 bg-gray-100 rounded-2xl grid grid-cols-1 lg:grid-cols-5  items-center  gap-2 shadow-2xl shadow-slate-400` // landscape:shadow-none" //remove last part to revert searchbar positioning
      }
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <div className="relative w-full">
        <div className=" portrait:hidden flex flex-row items-center flex-1 w-full bg-white p-3 rounded border-2 border-gray-300 ">
          <MdTravelExplore size={25} className="mr-2" />
          <input
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-none popup-container"
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleDestinationClick}
          />
          <button
            className={`${inputValue ? `` : `hidden`}`}
            onClick={(e) => {
              e.preventDefault();
              setInputValue("");
              setDestination("");
            }}
          >
            <GrClose />
          </button>
        </div>

        <div className=" landscape:hidden mb-2 p-2.5 bg-white rounded-2xl shadow-sm ">
          <h1 className="text-xl ml-2 font-bold poppins-semibold mb-2">Where are you going?</h1>
          <div className="flex flex-row items-center flex-1 w-full bg-white p-3 rounded-xl border-2 border-gray-300 ">
            <MdTravelExplore size={25} className="mr-2" />
            <input
              placeholder="Type... Rishikesh"
              className="text-md w-full focus:outline-none popup-container"
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleDestinationClick}
            />
            <button
              className={`${inputValue ? `` : `hidden`}`}
              onClick={(e) => {
                e.preventDefault();
                setInputValue("");
                setDestination("");
              }}
            >
              <GrClose />
            </button>
          </div>
        </div>
        {showPopup && (
          <div className={`popup-container absolute ${`landscape:top-full landscape:w-full portrait:top-24 portrait:w-full`} left-0 z-10 px-2.5`}>

            <ul className={` bg-white border border-gray-300 rounded-md ${!isMobile ? `` : `shadow`} `}>
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
          </div>
        )}
      </div>

      <>
        <div className="portrait:hidden">
          <DatePicker
            selected={checkIn}
            onChange={handleCheckInChange}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className=" xl:w-full w-full bg-white p-3 focus:outline-none rounded border-2 border-gray-300"
            wrapperClassName=" xl:w-full w-full"
            dateFormat={`dd/MM/yyyy`}
          />
        </div>
        <div className="portrait:hidden">
          <DatePicker
            selected={checkOut}
            onChange={handleCheckOutChange}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : undefined}
            maxDate={maxDate}
            placeholderText="Check-out Date"
            className=" xl:w-full w-full bg-white p-3 focus:outline-none rounded border-2 border-gray-300"
            wrapperClassName=" xl:w-full w-full"
            dateFormat={`dd/MM/yyyy`}
          />
        </div>
      </>


      <div className=" landscape:hidden my-2 p-2.5 bg-white rounded-2xl shadow-sm ">
        <h1 className="text-2xl ml-2 font-bold poppins-semibold mb-2">When</h1>
        <div className="grid grid-cols-2 gap-2">
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
              className="xl:w-full w-full bg-white p-3 focus:outline-none rounded-xl text-center border-2 border-gray-300"
              wrapperClassName="xl:w-full w-full"
              dateFormat={`dd/MM/yyyy`}
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
              className=" xl:w-full w-full bg-white p-3 focus:outline-none rounded-xl text-center border-2 border-gray-300"
              wrapperClassName=" xl:w-full w-full"
              dateFormat={`dd/MM/yyyy`}
            />
          </div>
        </div>
      </div>




      <div className=" portrait:hidden grid grid-cols-1 bg-white p-2.5 gap-3 rounded border-2 h-full border-gray-300 relative guestpop" onClick={() => setShowGuestPop(true)}>
        <div className="items-center flex justify-between mx-3">
          No. of Guests:
          <div className="flex gap-3 font-bold">
            {adultCount + childCount + infantCount}

          </div>
        </div>
        {showGuestPop && <div className="grid grid-cols-1 text-sm top-full h-max bg-white p-2.5 gap-3 rounded border-2 -bottom-28 w-max border-gray-300 absolute guestpop">
          <div className="items-center gap-2 grid grid-cols-3 text-left ">
            <span className=" col-span-2"><span className="text-sm"> Adults: </span> <span className="text-xs  text-gray-500">Ages 13 or above</span></span>
            <div className="grid grid-cols-3 text-center place-items-center gap-2">
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
              {adultCount}
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
          <div className="items-center gap-2 grid grid-cols-3 text-left ">
            <span className=" col-span-2">  <span className="text-sm">Children: </span> <span className="text-xs  text-gray-500">Ages 4-12</span></span>
            <div className="grid grid-cols-3 text-center place-items-center gap-2">
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
              {childCount}
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


          <div className="items-center gap-2 grid grid-cols-3 text-left ">
            <span className=" col-span-2">  <span className="text-sm">Infant: </span> <span className="text-xs  text-gray-500">Under 4</span></span>
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
              {infantCount}
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
        </div>}
      </div>


      <div className="landscape:hidden my-2 mb-3 p-2.5 bg-white rounded-2xl shadow-sm">
        <div className="flex justify-between items-center"
          onClick={() => setIsGuestExpanded(!isGuestExpanded)}
        >

          <h1
            className="text-2xl ml-2 font-bold poppins-semibold"
          >
            Who's Coming
          </h1>
          {/* <LuArrowDown /> */}
        {/* <motion.div
          variants={arrowVariants}
          initial={isGuestExpanded ? "collapsed" : "expanded"}
          animate={isGuestExpanded ? "expanded" : "collapsed"}
        >
          <LuArrowDown />
        </motion.div> */}
        </div>


        {/* <motion.div
          className="overflow-hidden"
          initial={isGuestExpanded ? "collapsed" : "expanded"}
          animate={isGuestExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
        > */}
          <ul className="mx-2">
            {[
              { label: "Adults", ageRange: "Ages 13 and above", count: adultCount, setCount: setAdultCount },
              { label: "Children", ageRange: "Ages 4-12", count: childCount, setCount: setChildCount },
              { label: "Infants", ageRange: "Under 4", count: infantCount, setCount: setInfantCount },
            ].map((item, index) => (
              <li key={index} className="items-center flex justify-between border-b last:border-b-0 py-3">
                <span className="flex flex-col">
                  <span className="text-lg poppins-medium">{item.label}</span>
                  <span className="text-xs text-gray-600 poppins-regular">{item.ageRange}</span>
                </span>
                <div className="grid grid-cols-3 text-center place-items-center gap-2">
                  <motion.button
                    className={`text-xl text-center ${item.count === 0 ? "text-gray-500" : ""}`}
                    disabled={item.count === 0}
                    onClick={(event: FormEvent) => {
                      event.preventDefault();
                      item.setCount(item.count - 1);
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <BiMinusCircle />
                  </motion.button>
                  {item.count}
                  <motion.button
                    className="text-xl text-center"
                    onClick={(event: FormEvent) => {
                      event.preventDefault();
                      item.setCount(item.count + 1);
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <BiPlusCircle />
                  </motion.button>
                </div>
              </li>
            ))}
          </ul>
        {/* </motion.div> */}
      </div>



      <div>
        <button className={`w-full bg-yogvan text-white h-full p-3 poppins-medium text-xl ${!isMobile ? `rounded-lg` : `rounded-xl`}`}>
          Search
        </button>
        <button
          type="reset"
          className="w-1/3 hidden bg-transparent text-gray-500 h-full p-3 poppins-regular text-xl hover:bg-red-500 rounded-lg"
        >
          X
        </button>
      </div>
    </form>
    </div>

  </div>

  );
};

export default SearchBar;
