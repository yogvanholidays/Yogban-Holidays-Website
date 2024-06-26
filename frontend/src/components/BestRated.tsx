import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { isMobile } from "react-device-detect";
import { BsFillStarFill } from "react-icons/bs";
type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className={isMobile ? "h-[150px]" : "h-[300px]"}>
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div
        className={
          isMobile
            ? "absolute bottom-0 p-2 bg-black bg-opacity-50 w-full rounded-b-md"
            : "absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md"
        }
      >
        <span
          className={
            isMobile
              ? "text-white font-semibold tracking-tight text-xs flex gap-2 flex-wrap"
              : "text-white font-bold tracking-tight text-lg flex gap-2 flex-wrap"
          }
        >
          {Array.from({ length: hotel.starRating }).map(() => (
            <BsFillStarFill className="fill-yellow-300" />
          ))}
          in {hotel.city}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
