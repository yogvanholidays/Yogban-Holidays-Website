import React, { useEffect, useState } from "react";
import { fetchAllCoupons } from "../api-client";
import { CouponType } from "../../../backend/src/shared/types";

const Coupons = () => {
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const fetchedCoupons:CouponType[] = await fetchAllCoupons();
        const validCoupons = fetchedCoupons.filter(coupon => {
          if (coupon.expiryDate) {
            // Check if the expiry date is after the current date
            return new Date(coupon.expiryDate) > new Date();
          }
          // If expiry date is not set, consider it as valid
          return true;
        });
        setCoupons(validCoupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
  
    getCoupons();
  }, []);
  
  if (!coupons) {
    return <></>;
  }
  return (
    <section className="space-y-3 mb-12" id="coupons">
      <h1 className="text-2xl font-bold mb-4">OFFERS FOR YOU</h1>
      <div className="flex overflow-x-scroll space-x-6">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="border border-dashed p-4 rounded-lg flex-shrink-0 w-96"
          >
            <p className="font-bold text-xl text-wrap mb-2">
              {coupon.couponMessage}
            </p>
            <div className="flex flex-grow-0 justify-between outline-dashed outline-1 outline-gray-500 rounded-md">
              <span className="py-2 ml-4 flex text-center items-center content-center">
                {coupon.couponCode}
              </span>
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded-l-none rounded-r-md hover:bg-gray-700"
                onClick={() => navigator.clipboard.writeText(coupon.couponCode)}
              >
                Copy Code
              </button>
            </div>
            <span className="font-base text-sm italic">
              {" "}
              {coupon.expiryDate ? (
                <>Expires on:&nbsp;
                  {new Date(coupon.expiryDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </>
              ) : (
                "Use Anytime"
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Coupons;
