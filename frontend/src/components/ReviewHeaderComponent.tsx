import { useState } from "react";

function ReviewHeaderComponent() {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>ReviewHeaderComponent</div>
        <button
          onClick={handlePopupToggle}
          className="text-blue-500 font-semibold hover:underline"
        >
          View Links
        </button>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 z-[999] w-full h-full bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg shadow-lg portrait:w-[70vw] landscape:w-[20rem]">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">View Guest Reviews</h1>
            </div>
            <div className="grid grid-cols-2 gap-5 portrait:grid-cols-1">
              <div className="mb-1">
                <a href="https://www.booking.com/hotel/in/yogvan-hill-view-apartment.en-gb.html?label=gen173nr-1BCAsobEIaeW9ndmFuLWhpbGwtdmlldy1hcGFydG1lbnRIM1gEaGyIAQGYAQm4ARjIAQzYAQHoAQGIAgGoAgS4Aqi65q4GwAIB0gIkMmVkMmY1NTgtYTQ5Ni00NmMwLWE0YmUtMzlkNjVjYzAzMTgw2AIF4AIB&sid=2ea154ba0084267aa4734d1943b95882&dist=0&keep_landing=1&sb_price_type=total&type=total&activeTab=photosGallery">
                  <img src="booking.png" alt="airbnb" className="w-full" />
                </a>
              </div>
              <div className="mb-1">
                <a href="https://www.booking.com/hotel/in/yogvan-hill-view-workation-apartment-wifi-kitchen5.en-gb.html?label=gen173nr-1BCAsobEIyeW9ndmFuLWhpbGwtdmlldy13b3JrYXRpb24tYXBhcnRtZW50LXdpZmkta2l0Y2hlbjVIM1gEaGyIAQGYAQm4ARjIAQzYAQHoAQGIAgGoAgS4Ap7J5q4GwAIB0gIkMjUxOTVmMGYtYThlNC00NzlmLTk0MjUtOTgzNjViZjdlZWZj2AIF4AIB&sid=2ea154ba0084267aa4734d1943b95882&dist=0&keep_landing=1&sb_price_type=total&type=total&activeTab=photosGallery">
                  <img src="booking.png" alt="airbnb" className="w-full" />
                </a>
              </div>
              <div className="mb-1">
                <a href="http://airbnb.co.in/p/yogvanrishikesh">
                  <img src="airbnb.png" alt="airbnb" className="w-full" />
                </a>
              </div>
              <div>
                <a href="https://www.makemytrip.com/hotels/hotel-details/?checkin=02262024&checkout=02272024&locusId=CTXRI&locusType=city&city=CTXRI&country=IN&searchText=Yogvan%20Hill%20View%201BHK%20Apartment%20Tapovan%20Rishikesh&roomStayQualifier=4e0e&_uCurrency=INR&reference=hotel&hotelId=202108271135307140&rf=directSearch&lat=30.13252&lng=78.32141&homeStay=true&type=hotel&rsc=1e4e0e">
                  <img src="mmt.svg" alt="airbnb" className="w-full" />
                </a>
              </div>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewHeaderComponent;
