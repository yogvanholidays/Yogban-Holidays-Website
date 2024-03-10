/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
// import SignOutButton from "./SignOutButton";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { fetchCarouselImages } from "../api-client";
import { CarouselImageType } from "../../../backend/src/shared/types";
// import yogbanLogo from "../assets/Yogvan.png";
import PopupMenu from "./PopupMenu";

interface Props {
  bgHandle: string;
}

const Header = ({ bgHandle }: Props) => {
  const { isLoggedIn, userEmail } = useAppContext();
  const isAdmin = userEmail === "yogvan@admin.com";
  const isHomePage = bgHandle === "HomePage";
  const [isScrolled, setIsScrolled] = useState(false);
  const [images, setImages] = useState<CarouselImageType[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const carouselImages = await fetchCarouselImages();
        setImages(carouselImages);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div
      className={isHomePage ? "pb-3 bg-transparent" : "bg-white"}
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      {/* {
      !isScrolled && (
        <div className="w-full absolute bg-white h-44 z-20"></div>
      )
    } */}
      <div
        className={
          isHomePage
            ? isScrolled
              ? "bg-white max-w-full container flex flex-wrap justify-between select-none  py-2 z-30 transition-all duration-1000"
              : "bg-white container max-w-full flex flex-wrap justify-between select-none  py-2 z-30 transition-all duration-1000"
            : "container mx-auto flex flex-wrap justify-between select-none  pb-5 pt-4 z-30"
        }
        style={
          isHomePage
            ? {
                position: "fixed",
                top: 0,
                zIndex: 999,
                transition: "all 0.3s ease-in-out",
                width: "100%",
              }
            : {}
        }
      >
        <span className="text-3xl text-black font-bold tracking-tight">
          <Link to="/">
            <span className="flex text-center flex-col items-center gap-3">
              <img src='https://res.cloudinary.com/dmwytfweq/image/upload/v1710054138/yog_b27kzl.png' style={{ height: "80px" }} alt="" />
            </span>
          </Link>
        </span>
        <span
          className="flex cursor-pointer select-none items-center"
          onClick={handlePopupToggle}
        >
          <span className="flex flex-col items-center mx-1">
            {/* <span className="text-4xl font-extrabold">4.0</span> */}

            {/* ) : ( */}
              <span className="text-xl portrait:text-sm  italic px-4 py-2 portrait:px-2 portrait:py-1 rounded-full border ">Guest's Experiences...</span>
            {/* )} */}
            {/* <span className="text-sm">for guest experience</span> */}
          </span>

        </span>
        <span className="flex space-x-2 items-center">
          {isLoggedIn ? (
            <>
              <PopupMenu isAdmin={isAdmin} />
              {/* <Link
                to="/my-bookings"
                className="flex items-center text-black px-3 font-bold hover:bg-gray-300 rounded-lg h-fit py-2 bg-gray-100 transition-all duration-300"
              >
                My Bookings
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center text-black px-3 font-bold hover:bg-gray-300 rounded-lg h-fit py-2 bg-gray-100 transition-all duration-300"
                >
                  Admin
                </Link>
              )}
              <SignOutButton /> */}
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-black px-3 font-bold hover:bg-gray-300 rounded-lg h-fit py-2 bg-gray-100 transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
      {isHomePage ? (
        <Carousel className="w-auto h-[45rem] portrait:h-[35rem]">
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <div
                className="d-block w-screen object-cover relative h-[45rem] portrait:h-[35rem]"
                style={{
                  backgroundImage: `url(${
                    image.imageUrl || "https://via.placeholder.com/800x400"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <h3
                    className="text-white text-6xl pt-serif-bold portrait:text-2xl"
                    style={{ textShadow: "0px 0px 30px rgba(0, 0, 0, 0.9)" }}
                  >
                    {image.featuredText}
                  </h3>
                  <Link
                    to={image.ButtonLink}
                    className="border-2 text-white px-6 py-3 portrait:mt-1 landscape:mt-4 rounded-md text-xl exploreButtonCarousel transition-all duration-200"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (<></>
        // <div className="container mx-auto flex flex-col gap-2">
        //   <h1 className="text-5xl text-black font-bold">Find Your Next Stay</h1>
        //   <p className="text-2xl text-black">
        //     Search low prices on hotels for your dream vacations
        //   </p>
        // </div>
      )}

      {showPopup && (
        <div className="fixed top-0 left-0 z-[999] w-full h-full bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg shadow-lg portrait:w-[70vw] landscape:w-[20rem]">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">View Guest Reviews</h1>
            </div>
            <div className="grid grid-cols-2 gap-5 portrait:grid-cols-1">
              {/* <div className="mb-1">
                <a href="https://www.booking.com/hotel/in/yogvan-hill-view-apartment.en-gb.html?label=gen173nr-1BCAsobEIaeW9ndmFuLWhpbGwtdmlldy1hcGFydG1lbnRIM1gEaGyIAQGYAQm4ARjIAQzYAQHoAQGIAgGoAgS4Aqi65q4GwAIB0gIkMmVkMmY1NTgtYTQ5Ni00NmMwLWE0YmUtMzlkNjVjYzAzMTgw2AIF4AIB&sid=2ea154ba0084267aa4734d1943b95882&dist=0&keep_landing=1&sb_price_type=total&type=total&activeTab=photosGallery">
                  <img
                    src="https://res.cloudinary.com/dmwytfweq/image/upload/v1708969207/Booking-Logo_nik3ck.png"
                    alt="airbnb"
                    className="w-full"
                  />
                </a>
              </div> */}
              <div className="mb-1">
                <a href="https://www.booking.com/hotel/in/yogvan-hill-view-workation-apartment-wifi-kitchen5.en-gb.html?label=gen173nr-1BCAsobEIyeW9ndmFuLWhpbGwtdmlldy13b3JrYXRpb24tYXBhcnRtZW50LXdpZmkta2l0Y2hlbjVIM1gEaGyIAQGYAQm4ARjIAQzYAQHoAQGIAgGoAgS4Ap7J5q4GwAIB0gIkMjUxOTVmMGYtYThlNC00NzlmLTk0MjUtOTgzNjViZjdlZWZj2AIF4AIB&sid=2ea154ba0084267aa4734d1943b95882&dist=0&keep_landing=1&sb_price_type=total&type=total&activeTab=photosGallery">
                  <img
                    src="https://res.cloudinary.com/dmwytfweq/image/upload/v1708969207/Booking-Logo_nik3ck.png"
                    alt="airbnb"
                    className="w-full"
                  />
                </a>
              </div>
              <div className="mb-1">
                <a href="http://airbnb.co.in/p/yogvanrishikesh">
                  <img
                    src="https://res.cloudinary.com/dmwytfweq/image/upload/v1708969208/Airbnb_Logo_B%C3%A9lo.svg_yrb9mg.png"
                    alt="airbnb"
                    className="w-full"
                  />
                </a>
              </div>
              <div>
                <a href="https://www.makemytrip.com/hotels/hotel-details/?checkin=02262024&checkout=02272024&locusId=CTXRI&locusType=city&city=CTXRI&country=IN&searchText=Yogvan%20Hill%20View%201BHK%20Apartment%20Tapovan%20Rishikesh&roomStayQualifier=4e0e&_uCurrency=INR&reference=hotel&hotelId=202108271135307140&rf=directSearch&lat=30.13252&lng=78.32141&homeStay=true&type=hotel&rsc=1e4e0e">
                  <img
                    src="https://res.cloudinary.com/dmwytfweq/image/upload/v1708969207/mmt_logo_llaezn.svg"
                    alt="airbnb"
                    className="w-full"
                  />
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
};

export default Header;
