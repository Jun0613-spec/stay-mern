import { useNavigate } from "react-router-dom";
import { MdAdd, MdDeleteForever, MdEdit, MdOutlineMap } from "react-icons/md";
import { PiMoney } from "react-icons/pi";
import { BiHotel } from "react-icons/bi";

import Button from "@/components/button";
import Spinner from "@/components/spinner";

import { useGetMyAccommodations } from "@/hooks/my-accommodations/use-get-my-accommodations";

import { accommodationFacilities, accommodationTypes } from "@/lib/constants";

import { useDeleteAccommodation } from "@/hooks/my-accommodations/use-delete-accommodation";
import { useConfirmModal } from "@/hooks/use-confirm";

const MyAccommodations = () => {
  const navigate = useNavigate();

  const { data: myAccommodations, isLoading } = useGetMyAccommodations();
  const { mutate: deleteAccommodation } = useDeleteAccommodation();

  const [ConfirmModal, confirm] = useConfirmModal(
    "Delete accommodation",
    "Are you sure you want to delete this accommodation?"
  );

  const handleDeleteAccommodation = async (accommodationId: string) => {
    const confirmed = await confirm();

    if (confirmed) {
      deleteAccommodation(accommodationId);
    }
  };

  if (!myAccommodations) {
    return <p>No Accommodations found</p>;
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <ConfirmModal />
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-2xl  font-bold mb-3">
            My Accommodation
          </h1>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate("/list-accommodation")}
            className="gap-2"
          >
            <MdAdd className="w-5 h-5 " />
            <p className="hidden md:block">List your accommodation</p>
          </Button>
        </div>

        {/* Accommodations */}
        <div className="flex flex-col gap-8">
          {myAccommodations.map((accommodation) => {
            const accommodationType = accommodationTypes.find(
              (type) => type.label === accommodation.type
            );

            const facilityIcons = accommodation.facilities.map(
              (facilityLabel) => {
                const facility = accommodationFacilities.find(
                  (f) => f.label === facilityLabel
                );
                return facility?.icon ? (
                  <div
                    key={facility?.label}
                    className="border border-neutral-300 dark:border-neutral-600 rounded-sm px-2 py-1 flex items-center"
                  >
                    <facility.icon className="mr-2 w-5 h-5" />
                    {facility?.label}
                  </div>
                ) : null;
              }
            );

            return (
              <div
                data-testid="accommodation-card"
                className="flex flex-col justify-between border border-neutral-300 dark:border-neutral-600 rounded-lg p-8 gap-5"
              >
                <h1 className="text-2xl font-bold mb-3">
                  {accommodation.name}
                </h1>

                <p className="whitespace-pre-line">
                  {accommodation.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-2">
                  <div className="border border-neutral-300 dark:border-neutral-600 rounded-sm px-2 py-1 flex items-center">
                    <MdOutlineMap className="mr-2 w-5 h-5" />
                    {accommodation.city}, {accommodation.country}
                  </div>

                  <div className="border border-neutral-300 dark:border-neutral-600 rounded-sm px-2 py-1 flex items-center">
                    {accommodationType?.icon && (
                      <accommodationType.icon className="mr-2 w-5 h-5" />
                    )}
                    {accommodation.type}
                  </div>

                  <div className="border border-neutral-300 dark:border-neutral-600 rounded-sm px-2 py-1 flex items-center">
                    <PiMoney className="mr-2 w-5 h-5" />£
                    {accommodation.pricePerNight} per night
                  </div>

                  <div className="border border-neutral-300 dark:border-neutral-600 rounded-sm px-2 py-1 flex items-center">
                    <BiHotel className="mr-2 w-5 h-5" />
                    {accommodation.adultCount} adults,{" "}
                    {accommodation.childCount} children
                  </div>
                </div>

                <div className="border border-neutral-300 dark:border-neutral-600 rounded-sm px-2 py-1 flex flex-wrap items-center gap-2">
                  {facilityIcons}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button
                    onClick={() =>
                      navigate(`/edit-accommodation/${accommodation.id}`)
                    }
                    variant="primary"
                    size="sm"
                    className="gap-2"
                  >
                    <MdEdit className="w-5 h-5" />
                    <span className="hidden md:block">Edit</span>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDeleteAccommodation(accommodation.id)}
                  >
                    <MdDeleteForever className="w-5 h-5" />
                    <span className="hidden md:block">Delete</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyAccommodations;
