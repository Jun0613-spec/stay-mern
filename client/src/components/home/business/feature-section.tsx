import { useNavigate } from "react-router-dom";

import Button from "@/components/button";

import { features } from "@/lib/constants";
import { FaRegCheckCircle } from "react-icons/fa";

const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 ">
        List with peace of mind
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-start gap-4">
            <FaRegCheckCircle className="w-6 h-6 flex-shrink-0 " />
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl font-semibold ">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-end">
        <Button
          onClick={() => navigate("/list-accommodation")}
          variant="primary"
          size="md"
        >
          List with peace of mind today
        </Button>
      </div>
    </section>
  );
};

export default FeatureSection;
