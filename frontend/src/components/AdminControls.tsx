import React from "react";
import { Link } from "react-router-dom";

function AdminControls() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Admin Controls</h1>

      <div className="flex gap-5 w-full flex-wrap">
        <Link
          to="/upload-destination"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center"
        >
          Upload A Destination
        </Link>{" "}
        <Link
          to="/view-destinations"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center"
        >
          View Destinations
        </Link>{" "}
        <Link
          to="/view-all-requests"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center"
        >
          List Property Requests
        </Link>
        <Link
          to="/delete-hotels"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center"
        >
          Delete Hotel
        </Link>
        <Link
          to="/add-hotel"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center"
        >
          Add Hotel
        </Link>
      </div>
    </div>
  );
}

export default AdminControls;
