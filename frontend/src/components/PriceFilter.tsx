type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <input
        type="range"
        min={500}
        max={10000}
        step={50}
        value={selectedPrice || 0}
        onChange={(event) => onChange(parseInt(event.target.value))}
        className="w-full"
      />
      <label className="mt-2 text-center block">
        {selectedPrice || "Select Max Price"}
      </label>
    </div>
  );
};

export default PriceFilter;
