import React, { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import { CarouselImageType } from "../../../backend/src/shared/types";

const ImageGalleryPage = () => {
  const [images, setImages] = useState<CarouselImageType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await apiClient.fetchCarouselImages();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.deleteCarouselImage(id);
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      try {
        await apiClient.uploadCarouselImage(file);
        fetchImages();
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between flex-wrap">
        <h2 className="font-bold text-2xl mb-4">Carousel Image Gallery</h2>
        <div className="mb-4">
          <label
            htmlFor="upload"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Upload Image
          </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-3 portrait:grid-cols-1 gap-2">
        {images.map((image) => (
          <div
            key={image._id}
            className="border rounded-md p-2 flex flex-col justify-end"
          >
            <img
              src={image.imageUrl}
              alt={`Carousel image ${image._id}`}
              className="w-full h-auto"
            />
            <button
              onClick={() => handleDelete(image._id)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryPage;
