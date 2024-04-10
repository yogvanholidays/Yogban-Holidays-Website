import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5 portrait:border-0 h-32 xl:h-auto portrait:overflow-scroll">
      <h4 className="text-md  font-semibold portrait:-mt-6 landscape:-mt-0 portrait:fixed landscape:mb-2">Facilities</h4>
      <div className="grid grid-cols-1 landscape:gap-2">

      {hotelFacilities.map((facility) => (
        <label className="flex items-center  space-x-2 portrait:text-sm" key={facility}>
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
            />
          <span>{facility}</span>
        </label>
      ))}
      </div>
    </div>
  );
};

export default FacilitiesFilter;
