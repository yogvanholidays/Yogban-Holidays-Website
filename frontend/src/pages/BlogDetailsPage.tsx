/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";

const BlogDetailsPage = () => {
  const { id } = useParams<{ id: string }>() 
  const [blog, setBlog] = useState<any>(null);
  const [checkIn,] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, ] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkOut") || new Date(new Date().getTime() + 86400000).toISOString())
  );
  const [adultCount, ] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, ] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "0")
  );
  
  const handleSelectNowClick = (event: any) => {
    event.preventDefault();
    const formattedCheckIn = checkIn.toISOString().split('T')[0];
    const formattedCheckOut = checkOut.toISOString().split('T')[0];
    const url = `https://bookings.yogvanholidayapartments.com/?propertyId=9166&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&adults=${adultCount}&children=${childCount}&promocode=&triggerSearch=true`;
    window.location.href = url;
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const fetchBlogDetails = async () => {
    try {
      const data = await apiClient.getBlogById(id|| '');
      setBlog(data);
    } catch (error) {
      console.error("Failed to fetch blog details:", error);
    }
  };

  if (!blog) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">{blog.title}</h1>
      <img src={blog.thumbnailImageUrl} alt={blog.title} className="rounded-lg mb-4 mx-auto w-full landscape:object-cover landscape:h-96" />
      <p className="text-lg font-semibold">Author: {blog.author}</p>
      <p className="text-lg font-semibold">Publish Date: {blog.publishDate}</p>
      <p className="my-4">{blog.content}</p>
      <button className="bg-yogvan w-full text-white h-full p-2 font-bold hover:bg-yogvan-dark text-xl rounded-lg" onClick={handleSelectNowClick}>
              Select Now
            </button>
    </div>
  );
};

export default BlogDetailsPage;
