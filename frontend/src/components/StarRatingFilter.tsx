import { FaStar } from 'react-icons/fa';

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  const totalStars = 5; // Total number of stars
  return (
    <div className="border-b border-slate-300 pb-5 portrait:border-0">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = (totalStars - index).toString(); // Stars count in descending order
        const isStarSelected = selectedStars.includes(starValue);
        return (
          <label className="flex items-center space-x-2" key={index}>
            <input
              type="checkbox"
              className="rounded"
              value={starValue}
              checked={isStarSelected}
              onChange={onChange}
            />
            <span className='flex gap-1 my-1'>
              {Array.from({ length: Number(starValue) }).map((_, i) => (
                <FaStar key={i} className={isStarSelected ? 'text-yellow-500' : 'text-gray-300'} />
              ))}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRatingFilter;
