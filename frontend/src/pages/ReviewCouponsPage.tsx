import { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import { CouponType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

const ReviewCouponsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [couponType, setCouponType] = useState("");
  const [neverExpires, setNeverExpires] = useState(false);
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const data = await apiClient.fetchAllCoupons();
      setCoupons(data);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.deleteCoupon(id);
      setCoupons(coupons.filter((coupon) => coupon._id !== id));
    } catch (error) {
      console.error("Failed to delete coupon:", error);
    }
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const matchSearchTerm = coupon.couponCode
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCouponType = !couponType || coupon.couponType === couponType;
    const matchNeverExpires =
      !neverExpires || coupon.neverExpires === neverExpires;

    return matchSearchTerm && matchCouponType && matchNeverExpires;
  });

  return (
    <div>
      <h2 className="font-bold text-2xl">Review Coupons</h2>
      <div className="flex portrait:flex-col gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by coupon code..."
          className="border p-2 rounded-md m-2 w-full"
        />
        <div className="flex min-w-fit items-center gap-2">
          <select
            value={couponType}
            onChange={(e) => setCouponType(e.target.value)}
            className="border p-2 rounded-md m-2"
          >
            <option value="">All Coupon Types</option>
            <option value="Percentage">Percentage</option>
            <option value="Direct Money Off">Direct Money Off</option>
          </select>
          <label className="m-2">
            <input
              type="checkbox"
              checked={neverExpires}
              onChange={(e) => setNeverExpires(e.target.checked)}
              className="mr-2"
            />
            Never Expires
          </label>
        </div>
        <Link to='/add-coupon' className="p-2 rounded-md bg-black text-white min-w-fit  text-center justify-center self-center portrait:w-full">Add Coupon</Link>
      </div>
      {loading && <p>Loading...</p>}
      <div className="flex flex-col">
        {filteredCoupons.map((coupon) => (
          <div
            key={coupon._id}
            className="m-2 border rounded-md p-2 flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-xl">{coupon.couponCode}</p>
              <p>{coupon.couponMessage}</p>
            </div>
            <button
              onClick={() => handleDelete(coupon._id)}
              className="p-2 ml-4 rounded-md bg-red-400 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCouponsPage;
