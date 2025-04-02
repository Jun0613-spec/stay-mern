import { accommodationFacilities } from "@/lib/constants";

interface FacilitiesFilterProps {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FacilitiesFilter = ({
  selectedFacilities,
  onChange
}: FacilitiesFilterProps) => {
  return (
    <div className="border-b border-neutral-300 dark:border-neutral-600 pb-5">
      <h4 className="text-sm font-semibold mb-3 text-neutral-900 dark:text-white">
        Facilities
      </h4>
      {accommodationFacilities.map((facility) => (
        <label
          key={facility.label}
          className="flex items-center space-x-2 mb-2 cursor-pointer text-sm"
        >
          <input
            type="checkbox"
            value={facility.label}
            checked={selectedFacilities.includes(facility.label)}
            onChange={onChange}
          />
          <span className="text-neutral-800 dark:text-neutral-200">
            {facility.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
