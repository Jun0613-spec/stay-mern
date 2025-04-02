import { Accommodation } from "@/types";

interface BookingDetailsSummaryProps {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  accommodation: Accommodation;
}

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  accommodation
}: BookingDetailsSummaryProps) => {
  return (
    <div className="grid gap-4 rounded-lg border border-neutral-300 dark:border-neutral-600 p-6 shadow-lg bg-white dark:bg-neutral-800">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
        Your Booking Details
      </h2>

      <div className="border-b pb-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Accommodation
        </p>
        <p className="font-bold text-neutral-900 dark:text-neutral-100">
          {accommodation.name}
        </p>
      </div>

      {/* Location */}
      <div className="border-b pb-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Location
        </p>
        <p className="font-bold text-neutral-900 dark:text-neutral-100">
          {accommodation.city}, {accommodation.country}
        </p>
      </div>

      {/* Check-in & Check-out */}
      <div className="flex justify-between gap-4 border-b pb-3">
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Check-in
          </p>
          <p className="font-bold text-neutral-900 dark:text-neutral-100">
            {checkIn.toDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Check-out
          </p>
          <p className="font-bold text-neutral-900 dark:text-neutral-100">
            {checkOut.toDateString()}
          </p>
        </div>
      </div>

      {/* Total Nights */}
      <div className="border-b pb-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Total Nights
        </p>
        <p className="font-bold text-neutral-900 dark:text-neutral-100">
          {numberOfNights} {numberOfNights === 1 ? "night" : "nights"}
        </p>
      </div>

      {/* Guests */}
      <div className="pb-1">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Guests</p>
        <p className="font-bold text-neutral-900 dark:text-neutral-100">
          {adultCount} {adultCount === 1 ? "adult" : "adults"} & {childCount}{" "}
          {childCount === 1 ? "child" : "children"}
        </p>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
