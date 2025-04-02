import { accommodationTypes } from "@/lib/constants";

interface AccommodationTypesFilterProps {
  selectedAccommodationTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccommodationTypesFilter = ({
  selectedAccommodationTypes,
  onChange
}: AccommodationTypesFilterProps) => {
  return (
    <div className="border-b border-neutral-300 dark:border-neutral-600 pb-5">
      <h4 className="text-sm font-semibold mb-3 text-neutral-900 dark:text-white">
        Accommodation type
      </h4>
      {accommodationTypes.map((accommodationType) => (
        <label
          key={accommodationType.label}
          className="flex items-center space-x-2 mb-2 cursor-pointer text-sm"
        >
          <input
            type="checkbox"
            value={accommodationType.label}
            checked={selectedAccommodationTypes.includes(
              accommodationType.label
            )}
            onChange={onChange}
          />
          <p className="text-neutral-800 dark:text-neutral-200">
            {accommodationType.label}
          </p>
        </label>
      ))}
    </div>
  );
};

export default AccommodationTypesFilter;
