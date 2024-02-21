import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { fetchCarouselImages } from "../api-client";
import { CarouselImageType } from "../../../backend/src/shared/types";

interface Props {
  bgHandle: string;
}

const Header = ({ bgHandle }: Props) => {
  const { isLoggedIn, userEmail } = useAppContext();
  const isAdmin = userEmail === "yogban@admin.com";
  const isHomePage = bgHandle === "HomePage";
  const [isScrolled, setIsScrolled] = useState(false);
  const [images, setImages] = useState<CarouselImageType[]>([{imageUrl: "https://via.placeholder.com/800x400"}]);

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
        console.error('Error fetching carousel images:', error);
      }
    };

    fetchImages();
  }, []);
  return (
    <div
      className={isHomePage ? "pb-3 bg-transparent" : "bg-red-900 py-6 pb-16"}
      style={{transition: "all 0.3s ease-in-out",}}
    >
      <div
        className={
          isHomePage
            ? isScrolled?"bg-red-900 max-w-full container flex flex-wrap justify-between py-4": "container max-w-full flex flex-wrap justify-between py-4"
            : "container mx-auto flex flex-wrap justify-between pb-5 pt-4"
        }
        style={
          isHomePage
            ? {
                position: "fixed",
                top: 0,
                zIndex: 999,
                transition: "all 0.3s ease-in-out",
                width:'100%'
              }
            : {}
        }
      >
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">YogbanHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center text-white px-3 font-bold hover:bg-red-600"
              >
                My Bookings
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center text-white px-3 font-bold hover:bg-red-600"
                >
                  Admin
                </Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white text-red-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
      {isHomePage ? (
        <Carousel className="w-auto" style={{ height: "35rem" }}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-screen object-cover"
            src={image.imageUrl || 'https://via.placeholder.com/800x400'}
            alt={`Carousel image ${index}`}
            style={{ height: "35rem" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
      ) : (
        <div className="container mx-auto flex flex-col gap-2">
          <h1 className="text-5xl text-white font-bold">Find Your Next Stay</h1>
          <p className="text-2xl text-white">
            Search low prices on hotels for your dream vacations
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
