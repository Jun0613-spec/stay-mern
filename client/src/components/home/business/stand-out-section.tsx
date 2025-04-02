import { FaStar, FaPuzzlePiece, FaSearch } from "react-icons/fa";

const StandOutSection = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-12">
        Make Your Listing Shine from Day One
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Showcase Your Reputation */}
        <div className="flex flex-col items-center text-center">
          <FaStar className="text-indigo-600 dark:text-indigo-400 w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Showcase Your Reputation
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300 mt-2">
            Bring in your ratings from other platforms to build trust with new
            guests instantly.
          </p>
        </div>

        {/* Seamless Listing Sync */}
        <div className="flex flex-col items-center text-center">
          <FaPuzzlePiece className="text-indigo-600 dark:text-indigo-400 w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Sync Your Listing Seamlessly
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300 mt-2">
            Easily integrate your property details and availability to manage
            bookings effortlessly.
          </p>
        </div>

        {/* Boost Your Visibility */}
        <div className="flex flex-col items-center text-center">
          <FaSearch className="text-indigo-600 dark:text-indigo-400 w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Boost Your Visibility
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300 mt-2">
            Stand out with a special highlight for new listings and attract more
            potential guests.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StandOutSection;
