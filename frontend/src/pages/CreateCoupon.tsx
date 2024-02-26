/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as apiClient from "../api-client";

const CreateCoupon = () => {
  const [couponType, setCouponType] = useState("Percentage");
  const [amount, setAmount] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [minNights, setMinNights] = useState("0");
  const [expiryDate, setExpiryDate] = useState("");
  const [neverExpires, setNeverExpires] = useState(false);

  const handleCouponTypeChange = (e:any) => {
    setCouponType(e.target.value);
  };

  const handleAmountChange = (e:any) => {
    setAmount(e.target.value);
  };

  const handleCouponCodeChange = (e:any) => {
    setCouponCode(e.target.value);
  };

  const handleCouponMessageChange = (e:any) => {
    setCouponMessage(e.target.value);
  };

  const handleMinNightsChange = (e:any) => {
    setMinNights(e.target.value);
  };

  const handleExpiryDateChange = (e:any) => {
    setExpiryDate(e.target.value);
  };

  const handleNeverExpiresChange = (e:any) => {
    setNeverExpires(e.target.checked);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const amountNumber = parseInt(amount);
      const minNightsNumber = parseInt(minNights);
      const expiryDateValue = neverExpires ? null : expiryDate;
      
      if (isNaN(amountNumber) || isNaN(minNightsNumber)) {
        throw new Error("Amount and Minimum Nights must be valid numbers");
      }

      const couponData = {
        couponType,
        amount: amountNumber,
        couponCode,
        couponMessage,
        minNights: minNightsNumber,
        expiryDate: expiryDateValue,
        neverExpires,
        creationDate: new Date().toISOString() // Add coupon creation date
      };

      console.log(couponData);

      const response = await apiClient.createCoupon(couponData);
      console.log("Coupon created successfully:", response);
      alert("Coupon created successfully");
    } catch (error) {
    //   console.error("Failed to create coupon:", error.message);
      alert("Failed to create coupon. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Coupon</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="couponType" className="text-lg mb-2">
            Coupon Type
          </label>
          <select
            id="couponType"
            value={couponType}
            onChange={handleCouponTypeChange}
            className="border rounded-md p-2"
          >
            <option value="Percentage">Percentage</option>
            <option value="Direct Money Off">Direct Money Off</option>
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="amount" className="text-lg mb-2">
            Amount ({couponType === "Percentage" ? "%" : "Money Off"})
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="couponCode" className="text-lg mb-2">
            Enter Code
          </label>
          <input
            type="text"
            id="couponCode"
            value={couponCode}
            onChange={handleCouponCodeChange}
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="couponMessage" className="text-lg mb-2">
            Enter Coupon Message
          </label>
          <input
            type="text"
            id="couponMessage"
            value={couponMessage}
            onChange={handleCouponMessageChange}
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="minNights" className="text-lg mb-2">
            Minimum Nights Required
          </label>
          <input
            type="number"
            id="minNights"
            value={minNights}
            onChange={handleMinNightsChange}
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="expiryDate" className="text-lg mb-2">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            className="border rounded-md p-2"
            disabled={neverExpires}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="neverExpires"
            checked={neverExpires}
            onChange={handleNeverExpiresChange}
            className="mr-2"
          />
          <label htmlFor="neverExpires" className="text-lg">
            Never Expires
          </label>
        </div>
        <button
          type="submit"
          className="transition-all duration-200 hover:bg-yogvan-dark bg-yogvan text-white px-4 py-2 rounded"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
};

export default CreateCoupon;
