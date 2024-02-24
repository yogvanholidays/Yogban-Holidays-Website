import React, { useState } from "react";
import * as apiClient from '../api-client';

const UploadDestination = () => {
  const [destinationName, setDestinationName] = useState("");
  const [illustrationImage, setIllustrationImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!destinationName) {
      alert("Please fill in the destination name");
      return;
    }

    const formData = new FormData();
    formData.append("name", destinationName);
    if (illustrationImage) {
      formData.append("illustrationImage", illustrationImage);
    }

    try {
      const response = await apiClient.addDestination(formData);
      console.log("Destination added successfully:", response);
      alert("Destination added successfully");
    } catch (error) {
      console.error("Failed to add destination:", error);
      alert("Failed to add destination. Please try again later.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIllustrationImage(files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Destination</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="destinationName" className="block font-medium text-gray-700">Destination Name:</label>
          <input
            type="text"
            id="destinationName"
            value={destinationName}
            onChange={(e) => setDestinationName(e.target.value)}
            className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="illustrationImage" className="block font-medium text-gray-700">Add Illustration image to feature it on Homepage</label>
          <input
            type="file"
            id="illustrationImage"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleImageChange}
            className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" className="block bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Upload Destination</button>
      </form>
    </div>
  );
};

export default UploadDestination;
