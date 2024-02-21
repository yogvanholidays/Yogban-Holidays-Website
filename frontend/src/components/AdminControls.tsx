import { Link } from "react-router-dom";

function AdminControls() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Admin Controls</h1>

      <div className="flex gap-5 w-full flex-wrap">
        <Link
          to="/review-blogs"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center items-center"
        >
          Review Blogs
        </Link>{" "}
        <Link
          to="/review-coupons"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center items-center"
        >
          Review Coupons
        </Link>{" "}
        <Link
          to="/view-destinations"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center items-center"
        >
          Review Destinations
        </Link>{" "}
        <Link
          to="/view-all-requests"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center items-center"
        >
          List Property Requests
        </Link>
        <Link
          to="/add-property"
          className="flex flex-1 bg-red-600 text-white text-lg rounded font-semibold p-2 hover:bg-red-500 text-center justify-center items-center"
        >
          Add Hotel
        </Link>
      </div>
    </div>
  );
}

export default AdminControls;
