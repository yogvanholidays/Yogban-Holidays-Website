/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { uploadOrUpdateRating, fetchRating } from "../api-client";

const RatingComponent = () => {
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

  const handleUploadOrUpdateRating = async () => {
    setIsLoading(true);
    try {
      await uploadOrUpdateRating(
        bookingdotcom,
        airbnb,
        makemytrip,
        googleTravel,
        agoda
      );
      console.log("Rating uploaded/updated successfully");
    } catch (error: any) {
      console.error("Error uploading/updating rating:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          <div className="w-full gap-3">
            <label htmlFor="rating" className="text-2xl font-bold">
              Booking.Com:
            </label>
            <input
              type="text"
              id="rating"
              value={bookingdotcom}
              onChange={(e) => setBookingdotcom(e.target.value)}
              className="bg-gray-300 w-full p-2 rounded-md"
            />
          </div>
          <div className="w-full gap-3">
            <label htmlFor="rating" className="text-2xl font-bold">
              Airbnb:
            </label>
            <input
              type="text"
              id="rating"
              value={airbnb}
              onChange={(e) => setAirbnb(e.target.value)}
              className="bg-gray-300 w-full p-2 rounded-md"
            />
          </div>
          <div className="w-full gap-3">
            <label htmlFor="rating" className="text-2xl font-bold">
              MakeMyTrip:
            </label>
            <input
              type="text"
              id="rating"
              value={makemytrip}
              onChange={(e) => setMakemytrip(e.target.value)}
              className="bg-gray-300 w-full p-2 rounded-md"
            />
          </div>
          <div className="w-full gap-3">
            <label htmlFor="rating" className="text-2xl font-bold">
              Google Travel:
            </label>
            <input
              type="text"
              id="rating"
              value={googleTravel}
              onChange={(e) => setGoogleTravel(e.target.value)}
              className="bg-gray-300 w-full p-2 rounded-md"
            />
          </div>
          <div className="w-full gap-3">
            <label htmlFor="rating" className="text-2xl font-bold">
              Agoda:
            </label>
            <input
              type="text"
              id="rating"
              value={agoda}
              onChange={(e) => setAgoda(e.target.value)}
              className="bg-gray-300 w-full p-2 rounded-md"
            />
          </div>
          <button
            onClick={handleUploadOrUpdateRating}
            className="font-bold text-white bg-black px-4 py-2 rounded-md"
          >
            Upload/Update
          </button>
          {/* <button onClick={handleUpdateRating}>Update Rating</button> */}
        </div>
      )}
    </div>
  );
};

export default RatingComponent;
