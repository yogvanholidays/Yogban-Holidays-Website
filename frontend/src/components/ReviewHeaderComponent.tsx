/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchRating } from "../api-client";

function ReviewHeaderComponent() {
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRating = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRating();
        setRating(data.rating);
      } catch (error: any) {
        console.error("Error fetching rating:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getRating();
  }, []);
  return (
    <div>
      <div>
        <h3 className="text-3xl font-bold mb-4">View User Reviews on</h3>
        <div className="flex portrait:flex-col landscape:flex-row flex-wrap">
          <div className="landscape:w-1/2">
            <span className="flex pointer-events-none select-none items-center content-center">
              <img
                src="/leftWheat.png"
                alt="prize1"
                className="h-[12rem] portrait:h-[3.5rem]"
              />
              <span className="flex flex-col items-center mx-1 content-center">
                {isLoading ? (
                  <span className="text-9xl font-extrabold">...</span>
                ) : (
                  <span className="text-9xl font-extrabold mb-10 -mx-8">{rating}</span>
                )}
              </span>
              <img
                src="/rightWheat.png"
                alt="prize2"
                className="h-[12rem] portrait:h-[3.5rem]"
              />
            </span>
          </div>
          <div className="landscape:w-1/2 grid grid-cols-2 gap-10 items-center content-center mt-4">
            <a
              href="https://www.booking.com/hotel/in/yogvan-hill-view-apartment.en-gb.html?label=gen173nr-1BCAsobEIaeW9ndmFuLWhpbGwtdmlldy1hcGFydG1lbnRIM1gEaGyIAQGYAQm4ARjIAQzYAQHoAQGIAgGoAgS4Aqi65q4GwAIB0gIkMmVkMmY1NTgtYTQ5Ni00NmMwLWE0YmUtMzlkNjVjYzAzMTgw2AIF4AIB&sid=2ea154ba0084267aa4734d1943b95882&dist=0&keep_landing=1&sb_price_type=total&type=total&activeTab=photosGallery"
              className="items-center content-center justify-center flex"
            >
              <img src="booking.png" alt="airbnb" className="h-16" />
            </a>
            <a
              href="https://www.booking.com/hotel/in/yogvan-hill-view-workation-apartment-wifi-kitchen5.en-gb.html?label=gen173nr-1BCAsobEIyeW9ndmFuLWhpbGwtdmlldy13b3JrYXRpb24tYXBhcnRtZW50LXdpZmkta2l0Y2hlbjVIM1gEaGyIAQGYAQm4ARjIAQzYAQHoAQGIAgGoAgS4Ap7J5q4GwAIB0gIkMjUxOTVmMGYtYThlNC00NzlmLTk0MjUtOTgzNjViZjdlZWZj2AIF4AIB&sid=2ea154ba0084267aa4734d1943b95882&dist=0&keep_landing=1&sb_price_type=total&type=total&activeTab=photosGallery"
              className="items-center content-center justify-center flex"
            >
              <img src="booking.png" alt="airbnb" className="h-16" />
            </a>
            <a
              href="http://airbnb.co.in/p/yogvanrishikesh"
              className="items-center content-center justify-center flex"
            >
              <img src="airbnb.png" alt="airbnb" className="h-16" />
            </a>
            <a
              href="https://www.makemytrip.com/hotels/hotel-details/?checkin=02262024&checkout=02272024&locusId=CTXRI&locusType=city&city=CTXRI&country=IN&searchText=Yogvan%20Hill%20View%201BHK%20Apartment%20Tapovan%20Rishikesh&roomStayQualifier=4e0e&_uCurrency=INR&reference=hotel&hotelId=202108271135307140&rf=directSearch&lat=30.13252&lng=78.32141&homeStay=true&type=hotel&rsc=1e4e0e"
              className="items-center content-center justify-center flex"
            >
              <img src="mmt.svg" alt="airbnb" className="h-16" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewHeaderComponent;
