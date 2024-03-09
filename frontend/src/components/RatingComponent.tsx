/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { uploadOrUpdateRating, fetchRating } from '../api-client';

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

  // const handleUpdateRating = async () => {
  //   setIsLoading(true);
  //   try {
  //     await updateRating(rating);
  //     console.log('Rating updated successfully');
  //   } catch (error:any) {
  //     console.error('Error updating rating:', error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className='my-4'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex flex-wrap gap-3'>
          <label htmlFor="rating" className='text-2xl font-bold'>Homepage Rating:</label>
          <input
            type="text"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className='bg-gray-300 p-2 rounded-md'
          />
          <button onClick={handleUploadOrUpdateRating} className='font-bold text-white bg-black px-4 py-2 rounded-md'>Upload/Update Rating</button>
          {/* <button onClick={handleUpdateRating}>Update Rating</button> */}
        </div>
      )}
    </div>
  );
};

export default RatingComponent;
