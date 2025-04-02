import { MdTravelExplore } from "react-icons/md";
import { LuX } from "react-icons/lu";

import { cn } from "@/lib/utils";

interface DirectionSectionProps {
  destination: string;
  setDestination: (destination: string) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

const DirectionSection = ({
  destination,
  setDestination,
  focusedField,
  setFocusedField
}: DirectionSectionProps) => {
  return (
    <div className="flex-1 relative">
      <div
        className={cn(
          "flex items-center bg-neutral-50 dark:bg-neutral-700 rounded-md px-3 py-2 border transition-all duration-200 h-12",
          focusedField === "destination"
            ? "border-indigo-600 dark:border-indigo-800 shadow-inner bg-white dark:bg-neutral-800"
            : "border-neutral-200 hover:border-indigo-400 dark:border-neutral-600 dark:hover:border-indigo-600"
        )}
      >
        <MdTravelExplore
          size={20}
          className="text-neutral-500 dark:text-neutral-300 mr-2 flex-shrink-0"
        />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full bg-transparent focus:outline-none text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm md:text-base"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          onFocus={() => setFocusedField("destination")}
          required
        />
        {destination && (
          <button
            type="button"
            onClick={() => setDestination("")}
            className="ml-2 text-neutral-400 hover:text-neutral-600 transition-colors dark:text-neutral-500 dark:hover:text-neutral-400 flex-shrink-0 cursor-pointer"
          >
            <LuX size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DirectionSection;
