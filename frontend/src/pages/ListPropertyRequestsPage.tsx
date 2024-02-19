import React, { useState, useEffect } from "react";
import * as apiClient from '../api-client';

const PropertyRequestsPage = () => {
  const [propertyRequests, setPropertyRequests] = useState([]);

  useEffect(() => {
    const fetchPropertyRequests = async () => {
      try {
        const data = await apiClient.getListPropertyRequests();
        setPropertyRequests(data);
      } catch (error) {
        console.error("Error fetching property requests:", error);
      }
    };

    fetchPropertyRequests();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">List of Property Requests</h1>
      <div className="flex flex-wrap gap-2">
        {propertyRequests.map((request) => (
          <div key={request._id} className="border rounded p-4 w-96">
            <h2 className="font-bold">{`${request.firstName} ${request.lastName}`}</h2>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Mobile:</strong> {request.mobile}</p>
            <p><strong>Property Name:</strong> {request.propertyName}</p>
            <p><strong>Property Location:</strong> {request.propertyLocation}</p>
            <p><strong>Property Type:</strong> {request.propertyType}</p>
            <p><strong>Rooms:</strong> {request.rooms}</p>
            <p><strong>Heard About:</strong> {request.hearAbout}</p>
            <p><strong>Photos Link:</strong> {request.photosLink}</p>
            <p><strong>Description:</strong> {request.propertyDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyRequestsPage;
