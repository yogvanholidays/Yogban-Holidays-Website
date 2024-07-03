import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-4 gap-8 portrait:hidden">
        <div className="w-full h-[300px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center rounded"
          />
        </div>
        <div className="grid grid-cols-1">
          <div>
            <div className="flex items-center">
              <span className="flex">
                {Array.from({ length: hotel.starRating }).map(() => (
                  <AiFillStar className="fill-yellow-400" key={hotel.name} />
                ))}
              </span>
              <span className="ml-1 text-sm">{hotel.type}</span>
            </div>
            <Link
              to={`/detail/${hotel._id}`}
              className="text-2xl font-bold cursor-pointer"
            >
              {hotel.name}
            </Link>
          </div>

          <div>
            <div className="line-clamp-4">{hotel.description}</div>
          </div>

          <div className="grid grid-cols-2 items-end whitespace-nowrap">
            <div className="flex flex-wrap gap-1 items-center">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap" key={facility}>
                  {facility}
                </span>
              ))}
              <span className="text-sm">
                {hotel.facilities.length > 3 &&
                  `+${hotel.facilities.length - 3} more`}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              {/* <span className="font-bold">₹{hotel.pricePerNight} per night</span> */}
              <Link
                to={`/detail/${hotel._id}`}
                className=" text-white h-full p-2 font-bold text-xl max-w-fit transition-all duration-200 hover:bg-yogvan-dark rounded-md bg-yogvan"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-3 gap-4 landscape:hidden">
        <div className="w-full h-[300px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center rounded"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <div>
            <div className="flex items-center">
              <span className="flex">
                {Array.from({ length: hotel.starRating }).map(() => (
                  <AiFillStar className="fill-yellow-400" key={hotel.name} />
                ))}
              </span>
              <span className="ml-1 text-sm">{hotel.type}</span>
            </div>
            <Link
              to={`/detail/${hotel._id}`}
              className="text-2xl font-bold cursor-pointer"
            >
              {hotel.name}
            </Link>
          </div>

          <div>
            <div className="line-clamp-4">{hotel.description}</div>
          </div>

          <div className="flex flex-wrap gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap" key={facility}>
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          {/* <div className="grid grid-cols-2 items-end whitespace-nowrap">
        </div> */}
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {/* <span className="font-bold">₹{hotel.pricePerNight} per night</span> */}
          <button
            // to={`/detail/${hotel._id}`}
            className=" text-white h-full w-full p-2 font-bold text-xl transition-all duration-200 hover:bg-yogvan-dark rounded-md bg-yogvan"
          >
            View More
          </button>
        </div>
        {/* <div className="grid grid-cols-1 w-full flex-col gap-1">
      </div> */}
      </div>
    </>
  );
};

export default SearchResultsCard;
