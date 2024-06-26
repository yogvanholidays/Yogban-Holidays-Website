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
import SearchBar from "./SearchBar";

interface Props {
  bgHandle: string;
}

const Header = ({ bgHandle }: Props) => {
  const { isLoggedIn, userEmail } = useAppContext();
  const isAdmin = userEmail === "yogvan@admin.com";
  const isHomePage = bgHandle === "HomePage";
  const [images, setImages] = useState<CarouselImageType[]>([]);

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
    <div className={isHomePage ? "pb-3" : "pb-5"}>
      <div
        className={
          "bg-white pr-3 lg:px-5 max-w-full flex  justify-between select-none  py-2 z-30"
        }
        // className={
        //   isHomePage
        //     ? "bg-white pr-3 lg:px-5 max-w-full flex  justify-between select-none  py-2 z-30 "
        //     : " lg:px-5 mx-auto flex pr-3 justify-between select-none pb-5 pt-4 z-30"
        // }
        // style={
        //   isHomePage
        //     ? {
        //         position: "fixed",
        //         top: 0,
        //         zIndex: 999,
        //         width: "100%",
        //         transition:'padding 0.3s'
        //       }
        //     : {transition:'padding 0.3s'}
        // }
        style={{
          position: "fixed",
          top: 0,
          zIndex: 999,
          width: "100%",
          transition: "padding 0.3s",
        }}
      >
        <span className="text-3xl text-black font-bold tracking-tight">
          <Link to="/">
            <span className="flex text-center flex-col items-center gap-3">
              <img
                src="https://res.cloudinary.com/dikox8x6w/image/upload/v1711480621/Yogvan_Final_Logo_g-01_r7ybed.png"
                className="h-14 my-1"
                alt=""
              />
            </span>
          </Link>
        </span>
        {/* <span
          className="flex cursor-pointer select-none items-center"
          onClick={handlePopupToggle}
        >
          <span className="flex flex-col items-center mx-1">
              <span className="text-xl portrait:text-sm  italic landscape:px-4 landscape:py-2 portrait:px-2 portrait:py-1 rounded-full border ">Guest's Experiences...</span>
          </span>
          
        </span> */}
        {!isHomePage && (
          <div className="flex items-center content-center">
            <SearchBar handler={""} />
          </div>
        )}
        <span className="flex space-x-2 items-center">
          <>
            <PopupMenu isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
            {/* <Link
                to="/my-bookings"
                className="flex items-center text-black px-3 font-bold hover:bg-gray-300 rounded-lg h-fit py-2 bg-gray-100 duration-300"
              >
                My Bookings
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center text-black px-3 font-bold hover:bg-gray-300 rounded-lg h-fit py-2 bg-gray-100 duration-300"
                >
                  Admin
                </Link>
              )}
              <SignOutButton /> */}
          </>
          {/* {isLoggedIn ? (
            <>
              <PopupMenu isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-black px-3 font-bold hover:bg-gray-300 rounded-lg h-fit py-2 bg-gray-100 duration-300"
            >
              Sign In
            </Link>
          )} */}
        </span>
      </div>
      {isHomePage ? (
        <Carousel className="w-auto h-[45rem] portrait:h-[25rem]">
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <div
                className="d-block w-screen object-cover relative h-[45rem] portrait:h-[25rem]"
                style={{
                  backgroundImage: `url(${
                    image.imageUrl || "https://via.placeholder.com/800x400"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center ">
                  <h3
                    className="text-white text-4xl pt-serif-bold portrait:text-lg animate-rise-up portrait:px-10 text-center"
                    style={{ textShadow: "0px 0px 30px rgba(0, 0, 0, 0.9)" }}
                  >
                    {image.featuredText}
                  </h3>
                  <Link
                    to={image.ButtonLink}
                    className="border-2 text-white px-6 landscape:py-3 portrait:px-2 portrait:py-2 portrait:mt-2 shadow-lg landscape:mt-4 rounded-md text-xl portrait:text-lg exploreButtonCarousel duration-200 animate-rise-up-2"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <></>
        // <div className="container mx-auto flex flex-col gap-2">
        //   <h1 className="text-5xl text-black font-bold">Find Your Next Stay</h1>
        //   <p className="text-2xl text-black">
        //     Search low prices on hotels for your dream vacations
        //   </p>
        // </div>
      )}
    </div>
  );
};

export default Header;
