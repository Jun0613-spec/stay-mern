import StandOutSection from "@/components/home/business/stand-out-section";
import CardSlider from "@/components/home/customer/card-slider";

import { useAuth } from "@/contexts/auth-context";

import { useGetAccommodations } from "@/hooks/accommodations/use-get-accommodations";
import { useGetTrendingAccommodations } from "@/hooks/accommodations/use-get-trending-accommodations";

const Home = () => {
  const { currentUser } = useAuth();

  const { data: latestAccommodations = [] } = useGetAccommodations();
  const { data: trendingAccommodations = [] } = useGetTrendingAccommodations();

  if (currentUser?.role === "BUSINESS") {
    return <StandOutSection />;
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
          Trending Accommodations
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Most popular accommodations based on user interactions
        </p>
        <CardSlider accommodations={trendingAccommodations} />
      </section>
      <section>
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
          Latest Accommodations
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Most recent accommodations added by our hosts
        </p>

        <CardSlider accommodations={latestAccommodations} />
      </section>
    </div>
  );
};

export default Home;
