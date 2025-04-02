import { Link } from "react-router-dom";

import { Accommodation } from "@/types";

interface DestinationCardProps {
  accommodation: Accommodation;
}

const DestinationCard = ({ accommodation }: DestinationCardProps) => {
  return (
    <Link
      to={`/accommodation/detail/${accommodation.id}`}
      className="relative group block bg-neutral-50 dark:bg-neutral-800 overflow-hidden rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-xl "
    >
      {/* Image Section */}
      <div className="flex items-center justify-center ">
        <img
          src={accommodation.imageUrls[0]}
          alt={accommodation.name}
          className="object-cover w-92 h-72 rounded-md"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 truncate">
          {accommodation.name}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {accommodation.city}, {accommodation.country}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-3">
          <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            £{accommodation.pricePerNight}
          </p>
          <span className="text-neutral-500 dark:text-neutral-600">
            / night
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
