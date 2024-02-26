/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { uploadOrUpdateRating, fetchRating, updateRating } from '../api-client';

const RatingComponent = () => {
  const [rating, setRating] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRating = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRating();
        setRating(data.rating);
      } catch (error:any) {
        console.error('Error fetching rating:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getRating();
  }, []);

  const handleUploadOrUpdateRating = async () => {
    setIsLoading(true);
    try {
      await uploadOrUpdateRating(rating);
      console.log('Rating uploaded/updated successfully');
    } catch (error:any) {
      console.error('Error uploading/updating rating:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRating = async () => {
    setIsLoading(true);
    try {
      await updateRating(rating);
      console.log('Rating updated successfully');
    } catch (error:any) {
      console.error('Error updating rating:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Rating Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <label htmlFor="rating">Rating:</label>
          <input
            type="text"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button onClick={handleUploadOrUpdateRating}>Upload/Update Rating</button>
          <button onClick={handleUpdateRating}>Update Rating</button>
        </>
      )}
    </div>
  );
};

export default RatingComponent;
