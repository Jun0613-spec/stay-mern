import FeatureSection from "./home/business/feature-section";

import { useAuth } from "@/contexts/auth-context";

const Hero = () => {
  const { currentUser } = useAuth();

  if (currentUser?.role === "BUSINESS") {
    return <FeatureSection />;
  }

  return (
    <div className="py-16">
      <div className="container mx-auto flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-black dark:text-white font-bold">
          Find your next stay
        </h1>
        <p className="md:text-lg lg:text-xl text-black dark:text-white">
          Discover accommodations wherever your journey takes you.
        </p>
      </div>
    </div>
  );
};

export default Hero;
