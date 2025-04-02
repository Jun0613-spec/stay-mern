import { ChangeEvent } from "react";

interface PriceFilterProps {
  selectedPrice?: number;
  onChange: (value?: number) => void;
}

const PriceFilter = ({ selectedPrice, onChange }: PriceFilterProps) => {
  const priceRange = Array.from({ length: 20 }, (_, index) => (index + 1) * 50);

  const handlePriceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? parseInt(event.target.value) : undefined;

    onChange(value);
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold mb-2 text-neutral-900 dark:text-white">
        Max price per night
      </h4>
      <select
        className="text-sm p-2 border rounded-md w-full cursor-pointer bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-800"
        value={selectedPrice || ""}
        onChange={handlePriceChange}
      >
        <option value="">Select Max Price</option>
        {priceRange.map((price) => (
          <option key={price} value={price}>
            £{price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
