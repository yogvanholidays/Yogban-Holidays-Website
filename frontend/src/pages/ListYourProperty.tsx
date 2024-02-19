import React, { useState } from "react";
import * as apiClient from "../api-client";
import { hotelTypes } from "../config/hotel-options-config";

const ListYourProperty = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    propertyName: "",
    propertyLocation: "",
    propertyType: "",
    rooms: "",
    hearAbout: "",
    photosLink: "",
    propertyDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.addListPropertyRequest(formData);
      console.log("List property request added successfully:", response);
      alert("List property request added successfully");
    } catch (error) {
      console.error("Failed to add list property request:", error);
      alert("Failed to add list property request. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">List Your Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name *</label>
            <input
              className="border rounded-md p-2"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name *</label>
            <input
              className="border rounded-md p-2"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email ID *</label>
            <input
              className="border rounded-md p-2"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="mobile">Mobile phone *</label>
            <input
              className="border rounded-md p-2"
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="propertyName">Enter Property Name *</label>
            <input
              className="border rounded-md p-2"
              type="text"
              id="propertyName"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="propertyLocation">
              Select your property location *
            </label>
            <input
              className="border rounded-md p-2"
              type="text"
              id="propertyLocation"
              name="propertyLocation"
              value={formData.propertyLocation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="propertyType">What type of property is it? *</label>
            <select
              className="border rounded-md p-2"
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Select property type</option>
              {hotelTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="rooms">How many rooms?</label>
            <input
              className="border rounded-md p-2"
              type="number"
              id="rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="hearAbout">Where did you hear about us? *</label>
            <select
              className="border rounded-md p-2"
              id="hearAbout"
              name="hearAbout"
              value={formData.hearAbout}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Google Search">Google Search</option>
              <option value="Reference from a guest">
                Reference from a guest
              </option>
              <option value="Reference from a Property Owner">
                Reference from a Property Owner
              </option>
              <option value="Blogs">Blogs</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="photosLink">Photos/Website link (if any)</label>
            <input
              className="border rounded-md p-2"
              type="text"
              id="photosLink"
              name="photosLink"
              value={formData.photosLink}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="propertyDescription">Describe your property</label>
            <textarea
              className="border rounded-md p-2"
              id="propertyDescription"
              name="propertyDescription"
              value={formData.propertyDescription}
              onChange={handleChange}
              rows={4}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ListYourProperty;
