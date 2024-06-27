import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "./LastestDestinationCard";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

const Home = () => {
  const { data: hotelList } = useQuery("fetchQuery", () => apiClient.Latest());
  const hotels = hotelList?.latestHotels;

  const topRowHotels = isMobile
    ? hotels?.slice(0, 4) || []
    : hotels?.slice(0, 5) || [];

    if( !Array.isArray(topRowHotels) ||  !Array.isArray(hotels)){
      return <></>
    }



  return (
    <section className="space-y-3 mb-12">
      <div className="flex justify-between items-center">
      <div>

      <h2 className="text-3xl font-bold poppins-semibold">Most Booked</h2>
      <p>Most booked accommodations</p>


      </div>
      <div className=" portrait:hidden">
          <Link
            to={`/search`}
            className="relative cursor-pointer overflow-hidden rounded-md"
          >
            <div className=" px-4 py-2 rounded-lg bg-yogvan hover:bg-yogvan-dark text-white flex items-center text-center justify-center content-center" style={{}}>
              <span className="font font-medium text-xl">View More</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid gap-4">

        <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        {isMobile ? (
          <Link
            to={`/search`}
            className="block w-full text-center bg-yogvan hover:bg-yogvan-dark text-white py-3 rounded-md"
          >
            View More
          </Link>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Home;
