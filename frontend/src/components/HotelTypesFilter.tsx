import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5 portrait:border-0 ">
      <h4 className="text-md font-semibold mb-2">Property Type</h4>
      <div className="grid landscape:grid-cols-1 gap-2 portrait:grid-cols-2">
        {hotelTypes.map((hotelType) => (
          <label
            className="flex items-center space-x-2 portrait:text-xs"
            key={hotelType}
          >
            <input
              type="checkbox"
              className="rounded"
              value={hotelType}
              checked={selectedHotelTypes.includes(hotelType)}
              onChange={onChange}
            />
            <span>{hotelType}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelTypesFilter;
