import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "./LastestDestinationCard";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

const Home = () => {
  const { data: hotelList } = useQuery("fetchQuery", () => apiClient.Latest());
  const hotels = hotelList?.latestHotels;
  const topRowHotels = hotels?.slice(0, 4) || [];

  const bottomRowHotels = isMobile
    ? hotels?.slice(2, 4) || []
    : hotels?.slice(2, 5) || [];

    if( !Array.isArray(topRowHotels) || !Array.isArray(bottomRowHotels) || !Array.isArray(hotels)){
      return <></>
    }



  return (
    <div className="space-y-3 mb-12">
      <h2 className="text-3xl font-bold">Latest Added</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">

        <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}

          {isMobile ? (
            <></>
          ) : (
            <Link
              to={`/search`}
              className="relative cursor-pointer overflow-hidden rounded-md"
            >
              <div className="h-[300px] bg-gray-500 flex items-center text-center justify-center content-center">
                <span className="font font-medium text-xl">View More</span>
              </div>
            </Link>
          )}
        </div>
        {isMobile ? (
          <Link
            to={`/search`}
            className="block w-full text-center bg-gray-500 text-white py-3 rounded-md"
          >
            View More
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
