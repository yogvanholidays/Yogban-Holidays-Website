/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchRating } from "../api-client";

function ReviewHeaderComponent() {
  const [bookingdotcom, setBookingdotcom] = useState("");
  const [airbnb, setAirbnb] = useState("");
  const [makemytrip, setMakemytrip] = useState("");
  const [googleTravel, setGoogleTravel] = useState("");
  const [agoda, setAgoda] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRating = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRating();
        setBookingdotcom(data.bookingdotcom);
        setAirbnb(data.airbnb);
        setMakemytrip(data.makemytrip);
        setGoogleTravel(data.googleTravel);
        setAgoda(data.agoda);
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
        <div className="grid grid-cols-2 portrait:grid-cols-1  gap-5">
          <div className="flex gap-4 items-center content-center ">
            <a
              // href="https://www.booking.com/hotel/in/yogvan-hill-view-apartment.en-gb.html?label=gen173nr-1BCAsobEIaeW9ndmFuLWhpbGwtdmlldy1hcGFydG1lbnRIM1gEaGyIAQGYAQm4ARjIAQzYAQHoAQGIAgGoAgS4Aqi65q4GwAIB0gIkMmVkMmY1NTgtYTQ5Ni00NmMwLWE0YmUtMzlkNjVjYzAzMTgw2AIF4AIB&sid=2ea154ba0084267aa4734d1943b95882&dist=0&keep_landing=1&sb_price_type=total&type=total&activeTab=photosGallery"
              href={!isLoading?bookingdotcom:`#`}
              className="items-center content-center justify-center flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="bookingcom-1.svg" alt="booking.com" className="h-10 " />
            </a>
            <a
              // href="http://airbnb.co.in/p/yogvanrishikesh"
              href={!isLoading?airbnb:`#`}
              className="items-center content-center justify-center flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="airbnb.svg" alt="airbnb" className="h-10 " />
            </a>
            <a
              // href="https://www.makemytrip.com/hotels/hotel-details/?checkin=02262024&checkout=02272024&locusId=CTXRI&locusType=city&city=CTXRI&country=IN&searchText=Yogvan%20Hill%20View%201BHK%20Apartment%20Tapovan%20Rishikesh&roomStayQualifier=4e0e&_uCurrency=INR&reference=hotel&hotelId=202108271135307140&rf=directSearch&lat=30.13252&lng=78.32141&homeStay=true&type=hotel&rsc=1e4e0e"
              href={!isLoading?makemytrip:`#`}
              className="items-center content-center justify-center flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="makemytrip.svg" alt="mmt" className="h-10 " />
            </a>
            <a
              // href="https://www.google.com/travel/hotels/entity/CgoItcn-yIWol_RmEAE/reviews?q=YOGVAN%20HOLIDAYS&g2lb=2503771%2C2503781%2C4284970%2C4291517%2C4814050%2C4874190%2C4893075%2C4965990%2C72277293%2C72302247%2C72317059%2C72406588%2C72414906%2C72421566%2C72458066%2C72462234%2C72470440%2C72470899%2C72471280%2C72472051%2C72473841%2C72481458%2C72483525%2C72484736%2C72485656%2C72485658%2C72486593%2C72494250%2C72498532%2C72513422%2C72513513%2C72523972&hl=en-IN&gl=in&cs=1&ssta=1&ts=CAEaSQorEicyJTB4MzkwOTE3NmFhODk5MzJmOToweDY2ZTg1ZDQwNTkxZmE0YjUaABIaEhQKBwjoDxAEGAgSBwjoDxAEGAkYATICEAAqCQoFOgNJTlIaAA&qs=CAE4AkIJCbWkH1lAXehmQgkJtaQfWUBd6GY&ap=MAA&ictx=111&utm_campaign=sharing&utm_medium=link&utm_source=htls
              // "
              href={!isLoading?googleTravel:`#`}
              className="items-center content-center justify-center flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="google-travel.svg"
                alt="google travel"
                className="h-10 "
              />
            </a>
            <a
              // href="https://www.agoda.com/yogvan-hill-view-1bhk-luxury-apartments-tapovan-rishikesh/hotel/all/rishikesh-in.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1918349&numberOfBedrooms=&familyMode=false&adults=2&children=0&rooms=1&maxRooms=0&checkIn=2024-04-8&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=1&showReviewSubmissionEntry=false&currencyCode=INR&isFreeOccSearch=false&isCityHaveAsq=false&pushId=CgYIgOfMsAYSBgiAitKwBhgBIPfi5wwqDBgBKggiAggBKgIIBA%3D%3D86d06936-7a11-d0f4-da79-d8efa7e4891a_20240330_19&los=1&searchrequestid=d0e3c842-db8c-442f-9f2c-39426d96745e&ds=vnSi2uwd2HkLsOMI#reviewSection"
              // className="items-center content-center justify-center flex"
              href={!isLoading?agoda:`#`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="agoda.png" alt="agoda" className="h-10 " />
            </a>
          </div>
          {/* <div className="flex justify-end portrait:justify-center items-center content-center">
            <span className="flex pointer-events-none select-none items-center content-center">
              <img
                src="/leftWheat.png"
                alt="prize1"
                className="landscape:h-[12rem] portrait:h-[8rem]"
              />
              <span className="flex flex-col items-center mx-1 content-center">
                {isLoading ? (
                  <span className="text-9xl portrait:text-8xl font-extrabold">...</span>
                ) : (
                  <span className="text-9xl portrait:text-8xl font-extrabold mb-10 -mx-8">{rating}</span>
                )}
              </span>
              <img
                src="/rightWheat.png"
                alt="prize2"
                className="landscape:h-[12rem] portrait:h-[8rem]"
              />
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ReviewHeaderComponent;
