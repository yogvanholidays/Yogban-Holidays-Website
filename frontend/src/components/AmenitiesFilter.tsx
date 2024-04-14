import { hotelAmenities } from "../config/hotel-options-config";

type Props = {
  selectedAmenities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AmenitiesFilter = ({ selectedAmenities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 portrait:pb-5 portrait:border-0 h-32 lg:h-auto portrait:overflow-scroll mt-4">
      <h4 className="text-md  font-semibold portrait:-mt-6 landscape:mt-2 portrait:fixed landscape:mb-2">Amenities</h4>
      <div className="grid grid-cols-1 landscape:gap-2">

      {hotelAmenities.map((amenity) => (
        <label className="flex items-center  space-x-2 portrait:text-sm" key={amenity}>
          <input
            type="checkbox"
            className="rounded"
            value={amenity}
            checked={selectedAmenities.includes(amenity)}
            onChange={onChange}
            />
          <span>{amenity}</span>
        </label>
      ))}
      </div>
    </div>
  );
};

export default AmenitiesFilter;
