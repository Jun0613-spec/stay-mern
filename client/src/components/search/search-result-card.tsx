import { Link, useNavigate } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";

import { Accommodation } from "@/types";

import { accommodationTypes, accommodationFacilities } from "@/lib/constants";

import Button from "../button";

import { useSaveAccommodation } from "@/hooks/accommodations/use-save-accommodation";
import { useGetSavedAccommodations } from "@/hooks/users/use-get-saved-accommodations";
import { useAuth } from "@/contexts/auth-context";
import toast from "react-hot-toast";

interface SearchResultCardProps {
  accommodation: Accommodation;
}

const SearchResultCard = ({ accommodation }: SearchResultCardProps) => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const { data: savedAccommodations } = useGetSavedAccommodations();
  const { mutate: saveAccommodation } = useSaveAccommodation();

  const isSaved = savedAccommodations?.some(
    (savedAccommodation) => savedAccommodation.id === accommodation.id
  );

  const toggleSave = () => {
    saveAccommodation(accommodation.id);
  };

  const handleLogin = () => {
    toast("Login first to save!", {
      icon: "🗝️"
    });

    navigate("/login");
  };

  const typeInfo = accommodationTypes.find(
    (type) => type.label === accommodation.type
  );
  const TypeIcon = typeInfo?.icon;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-[250px] xl:h-full">
        <img
          src={accommodation.imageUrls[0]}
          alt={accommodation.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 text-indigo-600 dark:text-indigo-400 bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-full flex items-center gap-1">
          {TypeIcon && <TypeIcon className="w-4 h-4" />}
          <p className="text-sm font-medium ">{accommodation.type}</p>
        </div>

        <Button
          onClick={isLoggedIn ? toggleSave : handleLogin}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-indigo-600 dark:text-indigo-400 bg-neutral-100 dark:bg-neutral-700 rounded-full p-1.5"
        >
          {isSaved ? (
            <GoHeartFill className="text-red-600 dark:text-red-800 w-4 h-4" />
          ) : (
            <GoHeart className="text-neutral-600 dark:text-neutral-400 w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="p-6 flex flex-col">
        <div className="r mb-4">
          <Link
            to={`/detail/${accommodation.id}`}
            className="text-2xl font-bold hover:opacity-80 transition-colors"
          >
            {accommodation.name}
          </Link>
        </div>

        <div className="mb-6 flex-1">
          <p className="line-clamp-3 text-neutral-700 dark:text-neutral-300">
            {accommodation.description}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">
            Facilities
          </h4>
          <div className="flex flex-wrap gap-2">
            {accommodation.facilities.map((facility) => {
              const facilityInfo = accommodationFacilities.find(
                (f) => f.label === facility
              );
              const FacilityIcon = facilityInfo?.icon;

              return (
                <div
                  key={facility}
                  className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded-md text-xs"
                >
                  {FacilityIcon && (
                    <FacilityIcon className="text-indigo-600 dark:text-indigo-400 text-sm" />
                  )}
                  <span>{facility}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold ">
              £{accommodation.pricePerNight}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              / night
            </span>
          </div>
          <Button
            onClick={() =>
              navigate(`/accommodation/detail/${accommodation.id}`)
            }
            variant="primary"
            size="md"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
