type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md mt-1 font-semibold">Max Price</h4>
      <input
        type="range"
        min={500}
        max={10000}
        step={50}
        value={selectedPrice || 0}
        onChange={(event) => onChange(parseInt(event.target.value))}
        className="w-full"
      />
      <label className="text-center mb-1 block">
        {selectedPrice || "Select Max Price"}
      </label>
    </div>
  );
};

export default PriceFilter;
