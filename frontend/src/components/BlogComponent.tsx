/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { BlogType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

function PickABlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await apiClient.getAllBlogs();
      setBlogs(data.slice(0, 4));
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  if (!blogs) {
    return <></>;
  }

  const handleButtonClick = (blog: any) => {
    // Handle the navigation or any other action when a blog is clicked
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <div >
      <div className="overflow-x-auto max-w-screen-xl mx-auto ">
        <div className="mb-2">
          <div className="flex justify-between items-center text-center">
            <h1 className="font-bold text-3xl text-center mt-2 poppins-semibold">Our Blogs</h1>
            <Link
              to="/blogs"
              className="px-4 py-2 rounded-lg bg-yogvan hover:bg-yogvan-dark text-white flex items-center text-center justify-center content-center portrait:hidden"
            >
              <span className="font font-medium text-xl">View More</span>
            </Link>
          </div>
          <div className="flex flex-nowrap overflow-x-scroll mb-1">
            {blogs.map((blog, index) => (
              <button
                key={index}
                className="flex flex-col text-center content-end items-center p-1.5 w-full md:w-1/2 lg:w-1/3 snap-mandatory snap-x"
                style={{ flex: "0 0 auto" }} // Set a fixed width for each button
                onClick={() => handleButtonClick(blog)}
              ><div className="border p-2.5 rounded-md h-full">
                  <img
                    src={blog.thumbnailImageUrl}
                    alt={blog.title}
                    className=" w-full h-2/3 rounded-md object-cover"
                  />

                  <span className="font-semibold text-semibold text-2xl mt-3">
                    {blog.title}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-500 text-semibold text-base mt-1/2">
                      {blog.author} - {blog.publishDate}
                    </span>
                  </div>
                </div>
              </button>
            ))}

          </div>
        </div>
      </div>
      <Link
        to="/blogs"
        className="rounded-lg bg-yogvan hover:bg-yogvan-dark text-white flex items-center text-center justify-center content-center landscape:hidden py-2"
        style={{ flex: "0 0 auto" }} // Set a fixed width for each button
      >
          <span className="text-xl font-semibold poppins-semibold">View More</span>
      </Link>
    </div>
  );
}

export default PickABlog;
