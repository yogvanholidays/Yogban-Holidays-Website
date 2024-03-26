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
      setBlogs(data.slice(0,4));
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  if (!blogs) {
    return <></>;
  }

  const handleButtonClick = (blog: any) => {
    // Handle the navigation or any other action when a blog is clicked
    navigate(`/blogs/${blog._id}`)
    
  };

  return (
    <div className="overflow-x-auto max-w-screen-xl mx-auto mb-12">
      <div className="space-y-3">
        <h1 className="font-bold text-3xl">Our Blogs</h1>
        <div className="flex flex-nowrap gap-3  pb-3">
          {blogs.map((blog, index) => (
            <button
              key={index}
              className="flex flex-col text-center content-end items-center p-4 border rounded-md"
              style={{ flex: "0 0 auto", width: "auto" }} // Set a fixed width for each button
              onClick={() => handleButtonClick(blog)}
            >
              <img
                src={blog.thumbnailImageUrl}
                alt={blog.title}
                className="2xl:w-96 2xl:h-72 w-64 h-48 rounded-md"
              />
              <span className="font-semibold text-semibold text-2xl mt-3">
                {blog.title}
              </span>
            <div>

              <span className="font-semibold text-gray-500 text-semibold text-base mt-1/2">
                {blog.author} - {blog.publishDate}
              </span>
            </div>
            </button>
          ))}
          <Link to='/blogs'
              className="flex flex-col text-center content-end items-center p-4 justify-center"
              style={{ flex: "0 0 auto", width: "25rem" }} // Set a fixed width for each button
            >
                <div className="w-1/2 h-1/2 rounded-full  border-gray-400 border-2 bg-gray-200 flex flex-col text-center items-center justify-center">
                    <span className="text-2xl font-semibold">View More</span>
                </div>

            </Link>
        </div>
      </div>
    </div>
  );
}

export default PickABlog;
