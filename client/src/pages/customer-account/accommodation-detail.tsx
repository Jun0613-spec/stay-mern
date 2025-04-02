import { useParams } from "react-router-dom";

import { useGetAccommodationById } from "@/hooks/accommodations/use-get-accommodation-by-id";

import { accommodationTypes, accommodationFacilities } from "@/lib/constants";

import GuestInfoForm from "@/components/forms/guest-info-form";

const AccommodationDetail = () => {
  const { accommodationId } = useParams();
  const { data: accommodation } = useGetAccommodationById(
    accommodationId as string
  );

  if (!accommodation) {
    return null;
  }

  const typeInfo = accommodationTypes.find(
    (type) => type.label === accommodation.type
  );
  const TypeIcon = typeInfo?.icon;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{accommodation.name}</h1>
        <div className="mt-2 flex items-center gap-3">
          {TypeIcon && (
            <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full text-sm font-medium">
              <TypeIcon className="w-4 h-4" />
              <span>{accommodation.type}</span>
            </div>
          )}

          <div className="flex items-end gap-1">
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              £{accommodation.pricePerNight}
            </p>
            <span className="text-neutral-600 dark:text-neutral-400">
              / night
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {accommodation.imageUrls.map((image, index) => (
          <div key={index} className="h-[300px] rounded-lg overflow-hidden">
            <img
              src={image}
              alt={`${accommodation.name} - ${index + 1}`}
              className="w-full h-full object-cover object-center"
              loading={index > 0 ? "lazy" : "eager"}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Facilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-4">
          {accommodation.facilities.map((facility) => {
            const facilityInfo = accommodationFacilities.find(
              (f) => f.label === facility
            );
            const FacilityIcon = facilityInfo?.icon;

            return (
              <div
                key={facility}
                className="flex items-center gap-3 px-2 py-1.5 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-sm"
              >
                {FacilityIcon && (
                  <FacilityIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                )}
                <span className="font-medium">{facility}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            About this {accommodation.type}
          </h2>
          <p className="whitespace-pre-line text-neutral-700 dark:text-neutral-300">
            {accommodation.description}
          </p>
        </div>

        <div className="h-fit ">
          <GuestInfoForm
            pricePerNight={accommodation.pricePerNight}
            accommodationId={accommodation.id}
          />
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetail;
