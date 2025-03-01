import React from "react";
import ChooseItem from "../shared/ChooseItem";
import { Button } from "../ui/button";

const FeaturedListings = () => {
  return (
    <section className="flex-center flex-col max-h-max px-4 md:px-24 py-10 my-4">
      <h2 className="text-xl md:text-2xl font-bold text-center">
        Why Choose Us?
      </h2>
      <p className="text-center mt-4 w-full max-w-lg mx-auto my-10 text-sm md:text-base">
        join real estate developers and investors all over the world to make
        your investment count. Invest with us and enjoy peace of mind
      </p>
      <div className="w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
        <ChooseItem
          title="P1"
          text="Local Market Expertise"
          bgColor="#6C8DACA3"
        />
        <ChooseItem
          title="P2"
          text="Tailored Solutions For Your Needs"
          bgColor="#5E5FA4A3"
        />
        <ChooseItem
          title="P3"
          text="Access to Exclusive Listings"
          bgColor="#E0B435A3"
        />
        <ChooseItem
          title="P4"
          text="Dedicated Support From Start To Finish"
          bgColor="#D6C3A9A3"
        />
      </div>
      <p className="text-center mt-4 w-full max-w-lg mx-auto my-10 text-sm md:text-base">
        Ready to experience the difference? Schedule your consultation now!
      </p>
      <div className="mt-4 flex justify-center items-center">
        <Button className="h-10 md:h-14 text-gold font-semibold bg-blue-300">
          Schedule Consultation
        </Button>
      </div>
    </section>
  );
};

export default FeaturedListings;
