import { LuCalendarDays, LuUsers } from "react-icons/lu";

import { useGetMyBookings } from "@/hooks/bookings/use-get-my-bookings";

const MyBookings = () => {
  const { data: bookings } = useGetMyBookings();

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-neutral-500 dark:text-neutral-300 italic">
        You have no bookings yet.
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-UK", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
          My Bookings
        </h1>
        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="group relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0">
              {/* Image Section */}
              <div className="relative h-full min-h-[200px]">
                <img
                  src={
                    booking.accommodation?.imageUrls[0] ||
                    "/placeholder-image.jpg"
                  }
                  alt={booking.accommodation?.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full text-sm font-medium">
                    {booking.accommodation?.city},{" "}
                    {booking.accommodation?.country}
                  </span>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6 flex flex-col">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {booking.accommodation?.name}
                </h2>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-4">
                    <LuCalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Dates
                      </p>
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {formatDate(booking.checkIn)} →{" "}
                        {formatDate(booking.checkOut)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <LuUsers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Guests
                      </p>
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {booking.adultCount}{" "}
                        {booking.adultCount === 1 ? "adult" : "adults"}
                        {booking.childCount > 0 && (
                          <>
                            , {booking.childCount}{" "}
                            {booking.childCount === 1 ? "child" : "children"}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
