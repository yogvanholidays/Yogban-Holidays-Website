import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
// import SignOutButton from "./SignOutButton";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { fetchCarouselImages } from "../api-client";
import { CarouselImageType } from "../../../backend/src/shared/types";
import yogbanLogo from "../assets/Yogvan.png";
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
      className={isHomePage ? "pb-3 bg-transparent" : "bg-yogvan pb-16"}
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
              ? "bg-white max-w-full container flex flex-wrap justify-between py-2 z-30 transition-all duration-1000"
              : "bg-white container max-w-full flex flex-wrap justify-between py-2 z-30 transition-all duration-1000"
            : "container mx-auto flex flex-wrap justify-between pb-5 pt-4 z-30"
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
            <span className="flex text-center items-center gap-3">
              <img src={yogbanLogo} style={{ height: "80px" }} alt="" />
            </span>
          </Link>
        </span>
        <span className="flex space-x-2 items-center">
          {isLoggedIn ? (
            <>
            <PopupMenu isAdmin={isAdmin}/>
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
              className="flex items-center text-red-600 px-3 font-bold hover:bg-gray-300 rounded-lg h-fit py-2 bg-gray-100 transition-all duration-300"
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
                  backgroundPosition:"center"
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <h3 className="text-white text-6xl pt-serif-bold portrait:text-2xl"  style={{ textShadow: "0px 0px 30px rgba(0, 0, 0, 0.9)" }}>
                    {image.featuredText}
                  </h3>
                  <Link
                    to={image.ButtonLink}
                    className="bg-black bg-opacity-50 border-2 text-white px-6 py-3 portrait:mt-1 landscape:mt-4 rounded-md text-xl exploreButtonCarousel transition-all duration-200"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div className="container mx-auto flex flex-col gap-2">
          <h1 className="text-5xl text-black font-bold">Find Your Next Stay</h1>
          <p className="text-2xl text-black">
            Search low prices on hotels for your dream vacations
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
