import { Link, useNavigate } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { FiHeart } from "react-icons/fi";

import Button from "@/components/button";

import { useSaveAccommodation } from "@/hooks/accommodations/use-save-accommodation";
import { useGetSavedAccommodations } from "@/hooks/users/use-get-saved-accommodations";

import { accommodationTypes, accommodationFacilities } from "@/lib/constants";

const SavedList = () => {
  const navigate = useNavigate();

  const { data: savedAccommodations = [] } = useGetSavedAccommodations();
  const { mutate: saveAccommodation } = useSaveAccommodation();

  const handleToggleSave = (accommodationId: string) => {
    saveAccommodation(accommodationId);
  };

  return (
    <div className="space-y-5 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Your Saved Accommodations</h2>
      </div>

      {savedAccommodations?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
          <FiHeart className="w-12 h-12 text-neutral-400 dark:text-neutral-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
            Your saved list is empty
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Start exploring accommodations and save your favorites to see them
            here.
          </p>
          <Button onClick={() => navigate("/")} variant="primary" size="md">
            Browse Accommodations
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {savedAccommodations?.map((accommodation) => {
            const typeInfo = accommodationTypes.find(
              (type) => type.label === accommodation.type
            );
            const TypeIcon = typeInfo?.icon;

            return (
              <div
                key={accommodation.id}
                className="border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
              >
                <div className="relative h-40">
                  <img
                    src={accommodation.imageUrls[0]}
                    alt={accommodation.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 text-indigo-600 dark:text-indigo-400 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs">
                    {TypeIcon && <TypeIcon className="w-4 h-4" />}
                    <p>{accommodation.type}</p>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleSave(accommodation.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-neutral-100/80 dark:bg-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-full p-2 backdrop-blur-sm"
                    aria-label="Remove from saved"
                  >
                    <GoHeartFill className="text-red-600 dark:text-red-400 w-4 h-4" />
                  </Button>
                </div>

                <div className="p-3 flex flex-col flex-grow ">
                  <div className="mb-2">
                    <Link
                      to={`/detail/${accommodation.id}`}
                      className="text-base font-bold hover:opacity-80 transition-colors line-clamp-1"
                    >
                      {accommodation.name}
                    </Link>
                  </div>

                  <div className="mb-3 flex-grow">
                    <p className="line-clamp-2 text-sm text-neutral-700 dark:text-neutral-300">
                      {accommodation.description}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-xs font-semibold mb-1 text-neutral-600 dark:text-neutral-400">
                      Facilities
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {accommodation.facilities.slice(0, 2).map((facility) => {
                        const facilityInfo = accommodationFacilities.find(
                          (f) => f.label === facility
                        );
                        const FacilityIcon = facilityInfo?.icon;

                        return (
                          <div
                            key={facility}
                            className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-xs"
                          >
                            {FacilityIcon && (
                              <FacilityIcon className="text-indigo-600 dark:text-indigo-400 text-xs" />
                            )}
                            <span>{facility}</span>
                          </div>
                        );
                      })}
                      {accommodation.facilities.length > 2 && (
                        <div className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-xs">
                          +{accommodation.facilities.length - 2}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold">
                        £{accommodation.pricePerNight}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        /night
                      </span>
                    </div>
                    <Button
                      onClick={() =>
                        navigate(`/accommodation/detail/${accommodation.id}`)
                      }
                      variant="primary"
                      size="sm"
                      className="text-xs px-3 py-1.5"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedList;
